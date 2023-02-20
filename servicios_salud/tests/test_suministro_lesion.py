from flaskr.models import *
import pytest, flask

class TestSuministroLesion:
    def test_medico_no_puede_llamar_servicio_crear_caso(self,client,mocker):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''

        response = client.post('/api/suministro-lesion/')

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    def test_paciente_crea_caso(self,client,mocker):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "tipo_piel": "normal", "especialidad": "", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'
        request_mock.return_value.status_code = 200
        
        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''

        data = {
            'tipo': 'mac',
            'forma': 'ani',
            'cantidad': 'dis',
            'distribucion': 'asi',
            'adicional': 'adicional',
            'image': '',
        }

        response = client.post('/api/suministro-lesion/', data=data)

        assert response.status_code==200
        assert response.json['message'] == 'Caso creado exitosamente'

    def test_medico_no_puede_llamar_servicio_casos_de_un_paciente(self,client,mocker):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''

        response = client.get('/api/suministro-lesion/')

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    def test_paciente_obtiene_sus_casos(self,client,mocker):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'
        request_mock.return_value.status_code = 200

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''

        response = client.get('/api/suministro-lesion/')

        assert response.status_code==200
        assert "casos" in response.json

    def test_obtener_informacion_caso(self,client,mocker,crear_caso):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente", "especialidad": "especialidad", "tipo_piel":"", "nombre":"nombre", "ubicacion_id": "ubicacion"}\n'
        request_mock.return_value.status_code = 200

        os_mock = mocker.patch("os.environ.get")
        os_mock.return_value.content = ''

        response = client.get('/api/suministro-lesion/'+str(crear_caso.id))

        assert response.status_code==200
        assert "descripcion" in response.json
        assert "image" in response.json
        assert "tipo_solucion" in response.json
        assert response.json['id'] == crear_caso.id