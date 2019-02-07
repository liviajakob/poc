from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def index():
    '''HTML for index page of the app'''
    return render_template('main.html')





@app.route('/grid', methods=['POST', 'GET'])
def grid():
    print(request.form)
    json = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [ [ [-262187, -2386746], [-262187, -2486746], [-362187, -2486746], [-362187, -2386746], [-262187, -2386746] ] ]
                },
                "properties": {
                    "id": 5,
                    "value": 10087
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [ [ [-262187, -2386746], [-262187, -2286746], [-162187, -2286746], [-162187, -2386746], [-262187, -2386746] ] ]
                },
                "properties": {
                    "id": 6,
                    "value": 20087
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [ [ [-262187, -2386746], [-262187, -2286746], [-362187, -2286746], [-362187, -2386746], [-262187, -2386746] ] ]
                },
                "properties": {
                    "id": 6,
                    "value": 20087
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [ [ [-300000, -1000000], [-300000, -900000], [-200000, -900000], [-200000, -1000000], [-300000, -1000000] ] ]
                },
                "properties": {
                    "id": 6,
                    "value": 20087
                }
            },

        ]
    }
    return jsonify(json)


@app.route('/point', methods=['POST', 'GET'])
def point():
    json = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-212187, -2386746]
                    },
                    "properties": {
                        "id": 5,
                        "elevation": 10
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-12187, -2086746]
                    },
                    "properties": {
                        "id": 6,
                        "elevation": 40
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [ -162000, -2400000 ]
                    },
                    "properties": {
                        "id": 7,
                        "elevation": 70
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [ -152000, -2600000 ]
                    },
                    "properties": {
                        "id": 7,
                        "elevation": 90
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [ -102000, -2900000 ]
                    },
                    "properties": {
                        "id": 7,
                        "elevation": 0
                    }
                }
            ]
        }

    return jsonify(json)




if __name__ == '__main__':
    port=5000
    app.run(debug=True, threaded=True, host='0.0.0.0', port=port)