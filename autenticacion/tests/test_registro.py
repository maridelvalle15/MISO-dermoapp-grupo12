import json

class TestRegistro:
    def test_crear_usuario_existente(self,client,headers,crear_usuario_medico):

        usuario = crear_usuario_medico

        data = {
            'password1': 'password1',
            'password2': 'password1',
            'email': usuario.email
        }

        response = client.post('/api/registro', data=json.dumps(data), headers=headers)

        assert response.status_code==400
        assert response.json['message'] == 'El usuario ya existe'