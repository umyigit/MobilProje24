from flask import Blueprint, request, jsonify, current_app
from datetime import datetime, timedelta

insulin_check_bp = Blueprint('insulin_check', __name__)

@insulin_check_bp.route('/check_blood_sugar', methods=['POST','GET'])
def check_blood_sugar():
    if request.method == 'POST':
        data = request.get_json()

        if not data or not isinstance(data, dict):
            current_app.logger.error('Invalid data format or no data provided')
            return jsonify({'error': 'No data provided or data is not in the correct format'}), 400

        email = data.get('email')
        user_date = data.get('date')

        mongo = current_app.mongo
        user = mongo.db.hastalar.find_one({"email": email})
        if user:
            entries = user.get("entries", {})

        if not email:
            current_app.logger.error('Email field is missing')
            return jsonify({'error': 'Email is required'}), 400

        if not entries:
            current_app.logger.error('Entries field is missing')
            return jsonify({'error': 'Entries are required'}), 400

        try:
            alerts = []
            today = datetime.strptime(user_date, '%d-%m-%Y')
            three_day_values = {}
            three_day_23_values = []
            two_day_03_values = []

            for i in range(3):
                check_date = today - timedelta(days=i)
                formatted_date = check_date.strftime('%d-%m-%Y')
                current_app.logger.debug(f"Checking blood sugar values for {email} on {formatted_date}")

                if formatted_date in entries:
                    blood_sugar_values = entries[formatted_date].get('bloodSugar', [])
                    blood_sugar_value_count = len(blood_sugar_values)

                    if i == 0: 
                        three_day_values = {i: [] for i in range(blood_sugar_value_count)}

                    for index in range(blood_sugar_value_count):
                        if index < len(blood_sugar_values):
                            blood_sugar_value = blood_sugar_values[index].strip()
                            if blood_sugar_value:
                                try:
                                    blood_sugar_value = int(blood_sugar_value)
                                    three_day_values[index].append(blood_sugar_value)

                                    # 23:00 ve 03:00 kontrolleri
                                    if index == blood_sugar_value_count - 2:
                                        three_day_23_values.append(blood_sugar_value)
                                    elif index == blood_sugar_value_count - 1:
                                        two_day_03_values.append(blood_sugar_value)

                                except ValueError:
                                    current_app.logger.error(f"Invalid blood sugar value '{blood_sugar_value}' at index {index}")
                            else:
                                current_app.logger.debug(f"No value provided for blood sugar at index {index} on {formatted_date}")
                else:
                    current_app.logger.warning(f"No blood sugar data found for {email} on {formatted_date}")
                    alerts.append(f"No blood sugar data found on {formatted_date}")

            # 03:00 için kontrol
            if len(two_day_03_values) >= 2:
                out_of_range_03 = [value for value in two_day_03_values if value < 70 or value > 110]
                if len(out_of_range_03) >= 2:
                    alerts.append(f"03:00 değeri bu hafta aralık dışında!")

            # 23:00 için kontrol 
            if len(three_day_23_values) == 3:
                out_of_range_23 = [value for value in three_day_23_values if value < 70 or value > 110]
                if len(out_of_range_23) == 3:
                    alerts.append(f"23:00 değeri üç gün boyunca aralık dışında! Değerler: {out_of_range_23}")

            
            for index, values in three_day_values.items():
                if len(values) == 3:  
                    high_values = [value for value in values if (value > 110 and index % 2 == 0) or (value > 140 and index % 2 != 0)]
                    low_values = [value for value in values if (value < 70)]

                    if len(high_values) == 3:
                        if index % 2 == 0:
                            alerts.append(f"Son 3 gün boyunca {index + 1}. açlık kan şekeri değerleri sürekli yüksek! Değerler: {values}")
                        else:
                            alerts.append(f"Son 3 gün boyunca {index + 1}. tokluk kan şekeri değerleri sürekli yüksek! Değerler: {values}")
                    elif len(low_values) == 3:
                        if index % 2 == 0:
                            alerts.append(f"Son 3 gün boyunca {index + 1}. açlık kan şekeri değerleri sürekli düşük! Değerler: {values}")
                        else:
                            alerts.append(f"Son 3 gün boyunca {index + 1}. tokluk kan şekeri değerleri sürekli düşük! Değerler: {values}")

            if alerts:
                return jsonify({'alerts': alerts}), 200
            else:
                return jsonify({'message': 'All blood sugar values within indices are within the normal range for the past three days.'}), 200

        except Exception as e:
            current_app.logger.error(f"Error occurred: {str(e)}")
            return jsonify({'error': str(e)}), 500      

    return jsonify(data), 200
