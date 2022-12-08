from flask import Flask, request
import kglab
import pandas as pd

from flask_cors import cross_origin

namespaces = {
    "flavor": "https://dsci558.org/Flavor",
    "food": "https://dbpedia.org/ontology/Food",
    "nutriinfo": "https://schema.org/NutritionInformation",
    "foodcategory": "https://dsci558.org/FoodCategory/",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
}

kg = kglab.KnowledgeGraph(
    name = "NutriKG",
    namespaces = namespaces,
)

kg.load_rdf("large_graph.ttl")

app = Flask(__name__)

@app.route("/recoFood", methods=['POST', 'GET'])
@cross_origin()
def reco():
    if request.method == 'POST':
        data = request.get_json()
        food = data['name']
        goal = data['goal']

        food = food.replace(" ", "-")

        if(goal == "Eat healthier"):
            sparql = """
                    SELECT ?o ?c2 ?c1
                    WHERE {{
                        food1:{0} flavor1:flavorOf ?o .
                        food1:{0} nutriinfo1:calories ?c1 .
                        ?o nutriinfo1:calories ?c2 .
                        FILTER(?c2 < ?c1)
                    }}
                        ORDER BY ?c2
                    """.format(food)

        elif(goal == "Bulk up"):
            sparql = """
                    SELECT ?o ?p2 ?p1
                    WHERE {{
                        food1:{0} flavor1:flavorOf ?o .
                        food1:{0} nutriinfo1:protein ?p1 .
                        ?o nutriinfo1:protein ?p2 .
                        FILTER(?p2 > ?p1)
                    }}
                        ORDER BY ?p2 DESC(?p2) 
                    """.format(food)

        df = kg.query_as_df(sparql)
        print(df.head(20))

        reco = df['o'][0]
        reco = reco[6:]
        reco = reco.replace("-", " ")
        reco = reco.strip()

        print(reco)
        
        return {
            "success": True,
            "food": reco,
        }

    else:
        sparql = """
                SELECT ?p ?o ?r
                WHERE {
                    ?p ?o ?r .
                }
                """

        df = kg.query_as_df(sparql)
        print(df.head(20))

        return '<p>Food recommendation endpoint!</p>'