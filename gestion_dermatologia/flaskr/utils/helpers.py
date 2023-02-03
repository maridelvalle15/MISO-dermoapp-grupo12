def construir_descripcion_caso(objetos_lesion,adicional):
    descripcion = 'Tipo de lesion: ' + objetos_lesion['tipo_lesion'].nombre + '\n' + \
        'Forma de la lesion: ' + objetos_lesion['forma_lesion'].nombre + '\n' + \
        'Numero de lesiones: ' + objetos_lesion['numero_lesion'].nombre + '\n' + \
        'Distribucion: ' + objetos_lesion['distribucion_lesion'].nombre + '\n' \
        'Informacion adicional: ' + adicional

    return descripcion