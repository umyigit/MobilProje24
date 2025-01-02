import json

class Notification:
    def __init__(self):
        self.alerts = []

    def parse_message(self, message):
        try:
            self.alerts = json.loads(message)
            return {"status": "success", "alerts": self.alerts}
        except json.JSONDecodeError as e:
            return {"status": "error", "message": f"JSONDecodeError: {e}"}

    def display_alerts(self):
        if not self.alerts:
            return {"status": "error", "message": "No alerts to display."}

        return {"status": "success", "alerts": self.alerts}
