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