import flask
from flask import Flask, request, jsonify
from flask import Response
from .oracle_conn import OraConn

connection = OraConn('DFjklwiu234$')._connection

def setup_rest_api(conductor):

    def _corsify(response):
        """ adds CORS headers to response """
        response.headers.add('Access-Control-Allow-Origin', '*')
        if request.method == 'OPTIONS':
            response.headers.add('Access-Control-Allow-Methods', '*')
            headers = request.headers.get('Access-Control-Request-Headers')
            if headers is not None:
                response.headers.add('Access-Control-Allow-Headers', headers)
        return response



    @conductor.app.errorhandler(400)
    def _bad_request(msg=None):
        """ bad request """
        response = conductor.templates['http_resp'].copy()
        response['action'] = f"{request}"
        response['code'] = '400'
        response['message'] = 'Bad request'
        if msg is not None:
            response['message'] += f': {msg}'
        return _corsify(jsonify(response)), 400


    @conductor.app.errorhandler(404)
    def _page_not_found(exception=None):
        """ page not found """
        response = conductor.templates['http_resp'].copy()
        response['action'] = f"{exception}"
        response['code'] = '404'
        response['message'] = f"Available endpoints: {','.join(conductor.list_endpoints())}"
        return jsonify(response), 404


    @conductor.app.route('/')
    @conductor.app.route('/home')
    def index():
        return "Home"


    @conductor.app.route('/get_test', methods=['GET'])
    def get_test():
        response = flask.jsonify({"test": "test responce from API"})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


    @conductor.app.route('/get_schemas/<db_name>', methods = ['GET'])
    def get_schemas(db_name):
        query = f"select * from table(atlas_dbmon.dbmon_pkg.get_all_schemas('{db_name}'))"
        cursor = connection.cursor()
        cursor.execute(query)
        res = cursor.fetchall()
        response = flask.jsonify({"all_shemas": res})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


    @conductor.app.route('/about')
    def about():
        return "About"




