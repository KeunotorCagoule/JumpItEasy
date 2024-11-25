import requests
from bs4 import BeautifulSoup
import json

def scrape_svg_to_json(url):
    # Fetch the webpage
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch webpage: {response.status_code}")
    html_content = response.text

    # Parse HTML content
    soup = BeautifulSoup(html_content, 'html.parser')

    # Extract all SVG elements
    svgs = soup.find_all('svg')
    svg_data = []

    # Process each SVG element
    for svg in svgs:
        svg_dict = {}
        svg_dict['attributes'] = {attr: svg.attrs[attr] for attr in svg.attrs}
        svg_dict['content'] = []

        # Process child elements inside the SVG
        for element in svg.find_all(True):  # True gets all nested elements
            element_dict = {
                "tag": element.name,
                "attributes": {attr: element.attrs[attr] for attr in element.attrs},
                "content": element.text.strip() if element.text.strip() else None
            }
            svg_dict['content'].append(element_dict)

        svg_data.append(svg_dict)

    # Convert to JSON-like format
    return svg_data


url = "https://strides.co.nz/course_plans.php?id=109287"  # Replace with the target URL
try:
    svg_data = scrape_svg_to_json(url)
#    svg_data_json = json.loads(svg_data)
    
    # Save to JSON file
    with open("svg_data.json", "w") as f:
        json.dump(svg_data, f, indent=4)
    print("SVG data has been saved to 'svg_data.json'.")
    
except Exception as e:
    print(f"An error occurred: {e}")