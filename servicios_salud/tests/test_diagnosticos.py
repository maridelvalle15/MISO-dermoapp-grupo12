import json

class TestDiagnosticos():
    def test_generar_diagnostico_automatico_correcto(self,client,headers,crear_caso):
        caso = crear_caso
        data = {
            'caso_id': caso.id,
        }

        response = client.post('/api/diagnostico-automatico',data=json.dumps(data),headers=headers)

        assert response.status_code==200
        assert "diagnostico" in response.json

    def test_diagnostico_solo_se_genera_una_vez(self,client,headers,crear_caso):
        caso = crear_caso
        data = {
            'caso_id': caso.id,
        }

        response = client.post('/api/diagnostico-automatico',data=json.dumps(data),headers=headers)
        response2 = client.post('/api/diagnostico-automatico',data=json.dumps(data),headers=headers)

        assert response2.status_code==400
        assert response2.json['message'] == 'No es posible realizar un diagnóstico al caso asignado'