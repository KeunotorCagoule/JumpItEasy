import json
import matplotlib.pyplot as plt
import numpy as np


def draw_arena(json_file):
    # Charger les données JSON
    with open(json_file, 'r') as file:
        data = json.load(file)

    # Préparer la figure
    plt.figure(figsize=(10, 10))
    plt.title("Parcours", fontsize=16)
    plt.xlabel("X", fontsize=12)
    plt.ylabel("Y", fontsize=12)
    plt.grid(True)

    def draw_line(line_data, label, color):
        # Support pour deux structures de données :
        # si "coordinates" existe, on l'utilise ; sinon, on utilise x1, y1, x2, y2
        if "coordinates" in line_data:
            x_values = [point[0] for point in line_data["coordinates"]]
            y_values = [point[1] for point in line_data["coordinates"]]
        else:
            x1 = line_data.get("x1")
            y1 = line_data.get("y1")
            x2 = line_data.get("x2")
            y2 = line_data.get("y2")
            x_values = [x1, x2]
            y_values = [y1, y2]
        plt.plot(x_values, y_values, color=color, linewidth=2, label=label)
        plt.scatter(x_values, y_values, color=color, zorder=5)

    # Dessiner les obstacles
    obstacles = data.get("obstacles", [])
    for obstacle in obstacles:
        x = obstacle.get("x", 0)
        y = obstacle.get("y", 0)
        obstacle_type = obstacle.get("type", "Unknown")
        rotation = obstacle.get("rotation", 0)

        # Convertir la rotation en radians
        angle = np.deg2rad(rotation)

        if obstacle_type == "Vertical":
            # Dessiner une ligne "verticale" (en fonction de la rotation)
            length = 50
            dx = length / 2 * np.cos(angle)
            dy = length / 2 * np.sin(angle)
            plt.plot([x - dx, x + dx], [y - dy, y + dy],
                     color="blue", linewidth=2)
            # Dessiner une flèche perpendiculaire au milieu
            arrow_length = 20
            arrow_dx = arrow_length * np.cos(angle + np.pi / 2)
            arrow_dy = arrow_length * np.sin(angle + np.pi / 2)
            plt.arrow(x, y, arrow_dx, arrow_dy, head_width=5,
                      head_length=5, fc='blue', ec='blue')

        elif obstacle_type == "Oxer":
            # Dessiner deux lignes parallèles
            length = 50
            gap = 10
            dx = length / 2 * np.cos(angle)
            dy = length / 2 * np.sin(angle)
            # Première ligne
            plt.plot([x - dx - gap / 2 * np.sin(angle), x + dx - gap / 2 * np.sin(angle)],
                     [y - dy + gap / 2 *
                         np.cos(angle), y + dy + gap / 2 * np.cos(angle)],
                     color="blue", linewidth=2)
            # Deuxième ligne
            plt.plot([x - dx + gap / 2 * np.sin(angle), x + dx + gap / 2 * np.sin(angle)],
                     [y - dy - gap / 2 *
                         np.cos(angle), y + dy - gap / 2 * np.cos(angle)],
                     color="blue", linewidth=2)
            # Flèches au milieu de chaque ligne
            arrow_length = 20
            arrow_dx = arrow_length * np.cos(angle + np.pi / 2)
            arrow_dy = arrow_length * np.sin(angle + np.pi / 2)
            plt.arrow(x - gap / 2 * np.sin(angle), y + gap / 2 * np.cos(angle),
                      arrow_dx, arrow_dy, head_width=5, head_length=5, fc='blue', ec='blue')
            plt.arrow(x + gap / 2 * np.sin(angle), y - gap / 2 * np.cos(angle),
                      arrow_dx, arrow_dy, head_width=5, head_length=5, fc='blue', ec='blue')

        # Ajouter une marque et un label pour l'obstacle
        plt.scatter(x, y, color="blue", s=100, zorder=5)
        plt.text(x, y, f"{obstacle_type}\n({rotation}°)",
                 fontsize=8, ha="center", va="center")

    # Recherche des obstacles de type "Start Line" pour tracer la ligne entre les flags
    for obstacle in obstacles:
        if obstacle.get("type") == "Start Line" or obstacle.get("type") == "Finish Line":
            start_id = obstacle.get("id")
            # Chercher les flags correspondants : "left"+id et "right"+id
            left_flag = None
            right_flag = None
            for obs in obstacles:
                if obs.get("id") == "left" + start_id and obs.get("type") == "leftFlag":
                    left_flag = obs
                if obs.get("id") == "right" + start_id and obs.get("type") == "rightFlag":
                    right_flag = obs
            if left_flag and right_flag:
                left_x = left_flag.get("x")
                left_y = left_flag.get("y")
                right_x = right_flag.get("x")
                right_y = right_flag.get("y")
                plt.plot([left_x, right_x], [left_y, right_y],
                         color="black", linestyle="--", linewidth=2, label="Start Flags")
                plt.scatter([left_x, right_x], [left_y, right_y],
                            color="black", zorder=5)

    # Définir les limites de l'arène
    arena = data.get("arena", {})
    length_x = arena.get("lengthX")
    length_y = arena.get("lengthY")
    if length_x and length_y:
        plt.xlim(0, float(length_x) + 60)
        plt.ylim(150, 450)

    # Inverser l'axe Y
    plt.gca().invert_yaxis()

    plt.show()


# Chemin vers le fichier JSON
json_file = "output.json"

draw_arena(json_file)
