from flask import Blueprint, request, jsonify, current_app
from datetime import datetime

insulin_record_bp = Blueprint('insulin_record', __name__)

@insulin_record_bp.route('/insulin_record', methods=['POST'])
def insulin_record():
    data = request.get_json()
    current_app.logger.debug('Received data: %s', data)

    if not data or not isinstance(data, dict):
        current_app.logger.error('Invalid data format or no data provided')
        return jsonify({'error': 'No data provided or data is not in the correct format'}), 400

    email = data.get('email')
    all_entries = data.get('entries', {})
    date = data.get('date')
    
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    if not date: 
        return jsonify({'error': 'Date is required'}), 400  

    try:
       
        entries = all_entries.get(date, {})  

        existing_entry = current_app.mongo.db.hastalar.find_one(
            {'email': email, f'entries.{date}': {'$exists': True}}
        )
        if existing_entry:
            current_app.logger.info('Entry for the date already exists.')
            return jsonify({'message': 'Entry for this date already exists.'}), 200

        blood_sugar = entries.get('bloodSugar')
        insulin_dose = entries.get('insulinDose')
        
        if not blood_sugar or not insulin_dose:
            return jsonify({'error': 'Missing bloodSugar or insulinDose data'}), 400

        update_result = current_app.mongo.db.hastalar.update_one(
            {'email': email},
            {'$set': {
                f'entries.{date}.bloodSugar': blood_sugar,
                f'entries.{date}.insulinDose': insulin_dose
            }}, 
            upsert=True
        )

        if update_result.modified_count == 0 and update_result.upserted_id is None:
            current_app.logger.info('No changes made to the existing record.')
            return jsonify({'message': 'No changes made to the existing record.'}), 200
        else:
            current_app.logger.info('Entry updated or added successfully')
            return jsonify({'message': 'Entry updated or added successfully!'}), 200

    except Exception as e:
        current_app.logger.error('Error occurred: %s', str(e))
        return jsonify({'error': str(e)}), 500