import requests
from bs4 import BeautifulSoup
import json
import math

HEIGHT_TO_ADD = 50


def parse_transform_matrix(transform):
    """Parse une matrice de transformation pour extraire x, y et l'angle de rotation."""
    if transform and transform.startswith("matrix("):
        # Extraire les valeurs de la matrice
        try:
            values = list(map(float, transform[len("matrix("):-1].split()))
            if len(values) == 6:
                # Calculer l'angle de rotation en degrés et ajouter 90 degrés
                angle = math.degrees(math.atan2(values[1], values[0])) - 90
                x, y = values[4], values[5]
                return x, y, angle
        except ValueError:
            # Gérer le cas où la conversion échoue
            return None, None, 0
    return None, None, 0


def parse_html_to_json(html_content):
    # Charger et parser le contenu HTML
    soup = BeautifulSoup(html_content, 'html.parser')

    # Extraire les dimensions de l'arène
    arena_group = soup.find("g", {"id": "arena"})
    if arena_group:
        rect = arena_group.find("rect")
        if rect:
            length_x = rect.get("width")
            length_y = rect.get("height")
        else:
            length_x = None
            length_y = None
    else:
        length_x = None
        length_y = None

    # Extraire les autres informations de l'arène
    arena = {
        "levels": soup.find(id="class_details").text if soup.find(id="class_details") else None,
        "roundJumps": soup.find(id="roundJumps0").text if soup.find(id="roundJumps0") else None,
        "roundDetails": soup.find(id="roundDetails0").text if soup.find(id="roundDetails0") else None,
        "roundTimes": soup.find(id="roundTimes0").text if soup.find(id="roundTimes0") else None,
        "lengthX": length_x,
        "lengthY": str(int(length_y) + HEIGHT_TO_ADD),
    }

    # Extraire les obstacles dans le groupe jumpGroup ayant un attribut "type"
    obstacles = []
    jump_group = soup.find("g", {"id": "jumpGroup"})
    if jump_group:
        for obstacle in jump_group.find_all("g", {"type": True}):
            obstacle_type = obstacle.get("type", "")
            if obstacle_type not in ["Judges Box", "In And Out"]:
                transform = obstacle.get("transform", "")
                x, y, rotation = parse_transform_matrix(transform)
                obstacle_data = {
                    "id": obstacle.get("id", ""),
                    "type": obstacle_type,
                    "x": x,
                    "y": y,
                    "rotation": rotation,
                }
                obstacles.append(obstacle_data)

    # Extraire les lignes de départ et d'arrivée
    def extract_line_data(line_group):
        if not line_group:
            return {"x1": None, "y1": None, "x2": None, "y2": None}
        line_element = line_group.find("line")
        if line_element:
            return {
                "x1": float(line_element.get("x1", 0)),
                "y1": float(line_element.get("y1", 0)),
                "x2": float(line_element.get("x2", 0)),
                "y2": float(line_element.get("y2", 0)),
            }
        return {"x1": None, "y1": None, "x2": None, "y2": None}

    line_start_group = soup.find("g", {"type": "Start Line"})
    line_end_group = soup.find("g", {"type": "Finish Line"})

    start_line = extract_line_data(line_start_group)
    end_line = extract_line_data(line_end_group)

    # Construire le JSON de sortie
    output = {
        "arena": arena,
        "obstacles": obstacles,
        "line_start": start_line,
        "line_end": end_line,
    }

    return output


# URL du fichier SVG
url = 'https://strides.co.nz/course_plans.php?id=109287'

# Faire une requête GET pour récupérer le contenu HTML
response = requests.get(url)
html_content = response.text

# Parser le contenu HTML et afficher le JSON généré
json_output = parse_html_to_json(html_content)

# Créer un fichier JSON
json_file = "output.json"
with open(json_file, 'w') as file:
    json.dump(json_output, file, indent=4)
