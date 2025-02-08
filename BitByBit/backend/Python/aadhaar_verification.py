import xml.etree.ElementTree as ET

def extract_aadhaar_details(xml_file):
    try:
        # Parse the XML file
        tree = ET.parse(xml_file)
        root = tree.getroot()
        
        # Extract details from XML (modify according to the XML structure)
        aadhaar_details = {
            "name": root.find(".//name").text,
            "address": root.find(".//address").text,
            "dob": root.find(".//dob").text,
            "gender": root.find(".//gender").text,
            "uid": root.find(".//uid").text,
        }

        return aadhaar_details
    except Exception as e:
        return {"error": f"Failed to extract Aadhaar details: {str(e)}"}

# Example usage:
aadhaar_details = extract_aadhaar_details('path_to_aadhaar.xml')
print(aadhaar_details)
