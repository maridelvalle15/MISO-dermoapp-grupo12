class TestRegistro:
    def test_contrasena_erronea(self,client):
        #topdir = os.path.join(os.path.dirname(__file__), "autenticacion/flaskr")
        #sys.path.append(topdir)

        #app = create_app('test')
        response = client.get('/api/registro')

        assert response.status_code==200