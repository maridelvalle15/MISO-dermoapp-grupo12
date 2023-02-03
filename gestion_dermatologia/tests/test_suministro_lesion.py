from flaskr.models import *
import pytest, flask

class TestRegistro:
    def test_medico_no_puede_llamar_servicio(self,client,mocker):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Medico"}\n'

        response = client.post('/api/suministro-lesion')

        assert response.status_code==401
        assert response.json['message'] == 'Unauthorized'

    def test_paciente_crea_caso(self,client,mocker):
        
        request_mock = mocker.patch("requests.get")
        request_mock.return_value.content = b'{"id_usuario": 3, "rol": "Paciente"}\n'

        data = {
            'tipo': 'mac',
            'forma': 'ani',
            'cantidad': 'dis',
            'distribucion': 'asi',
            'adicional': 'adicional',
            'image': '',
        }

        response = client.post('/api/suministro-lesion', data=data)

        assert response.status_code==200
        assert response.json['message'] == 'Caso creado exitosamente'
