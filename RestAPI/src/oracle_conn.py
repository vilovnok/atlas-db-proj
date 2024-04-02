import cx_Oracle

class OraConn:
    ora_conn = {
        'schema': 'atlas_dbmon2_r'
    }

    def __init__(self, passwd=None):
        self._passwd = passwd
        self._connection = cx_Oracle.connect(self.ora_conn['schema'], self._passwd, 'INT8R')
        print('Initialised oracle connection')