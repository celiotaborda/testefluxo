from flask import Flask, request, jsonify, send_from_directory
import csv
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://seunits.com", "https://celiotaborda.github.io"])
DATA_FILE = 'fluxo_dados.csv'
CAMPOS = ['Safra', 'nData', 'Banco', 'Numero', 'Historico', 'EntradaSaida', 'Valor', 'Codigo']
BANCOS_FILE = 'bancos.csv'
SAFRAS_FILE = 'safras.csv'
CODIGOS_FILE = 'codigos.csv'

def load_data():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f, fieldnames=CAMPOS)
            data = list(reader)
            # Filtra linhas inválidas (menos colunas)
            data = [row for row in data if all(campo in row for campo in CAMPOS)]
            return data
    except Exception as e:
        print(f'Erro ao ler {DATA_FILE}:', e)
        return []

def save_data(data):
    with open(DATA_FILE, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=CAMPOS)
        writer.writerows(data)

def load_simple_list(filename):
    if not os.path.exists(filename):
        return []
    with open(filename, 'r', encoding='utf-8') as f:
        return [linha.strip() for linha in f if linha.strip()]

def save_simple_list(filename, lista):
    with open(filename, 'w', encoding='utf-8') as f:
        for item in lista:
            f.write(f"{item}\n")

# --- Funções para códigos com origem ---
def load_codigos():
    if not os.path.exists(CODIGOS_FILE):
        return []
    codigos = []
    with open(CODIGOS_FILE, 'r', encoding='utf-8') as f:
        for linha in f:
            partes = linha.strip().split(',', 1)
            if len(partes) == 2:
                codigos.append({'codigo': partes[0], 'origem': partes[1]})
            elif len(partes) == 1 and partes[0]:
                codigos.append({'codigo': partes[0], 'origem': 'Receita'})
    return codigos

def save_codigos(lista):
    with open(CODIGOS_FILE, 'w', encoding='utf-8') as f:
        for item in lista:
            f.write(f"{item['codigo']},{item['origem']}\n")

@app.route('/api/fluxo', methods=['GET'])
def get_fluxo():
    try:
        data = load_data()
        return jsonify(data)
    except Exception as e:
        print('Erro na API /api/fluxo:', e)
        return jsonify({'error': 'Erro ao ler os dados do fluxo. Verifique o arquivo CSV e o encoding.'}), 500

@app.route('/api/fluxo', methods=['POST'])
def add_fluxo():
    data = load_data()
    novo = request.json
    # Garante que todos os campos estejam presentes e na ordem correta
    registro = {campo: novo.get(campo, '') for campo in CAMPOS}
    data.append(registro)
    save_data(data)
    return jsonify({'success': True})

@app.route('/api/fluxo/<int:idx>', methods=['PUT'])
def edit_fluxo(idx):
    data = load_data()
    if 0 <= idx < len(data):
        data[idx] = request.json
        save_data(data)
        return jsonify({'success': True})
    return jsonify({'error': 'Not found'}), 404

@app.route('/api/fluxo/<int:idx>', methods=['DELETE'])
def delete_fluxo(idx):
    data = load_data()
    if 0 <= idx < len(data):
        data.pop(idx)
        save_data(data)
        return jsonify({'success': True})
    return jsonify({'error': 'Not found'}), 404

@app.route('/api/bancos', methods=['GET'])
def get_bancos():
    return jsonify(load_simple_list(BANCOS_FILE))

@app.route('/api/bancos', methods=['POST'])
def add_banco():
    bancos = load_simple_list(BANCOS_FILE)
    banco = request.json.get('banco')
    if banco and banco not in bancos:
        bancos.append(banco)
        save_simple_list(BANCOS_FILE, bancos)
    return jsonify({'success': True})

@app.route('/api/bancos/<banco>', methods=['DELETE'])
def delete_banco(banco):
    bancos = load_simple_list(BANCOS_FILE)
    bancos = [b for b in bancos if b != banco]
    save_simple_list(BANCOS_FILE, bancos)
    return jsonify({'success': True})

@app.route('/api/safras', methods=['GET'])
def get_safras():
    return jsonify(load_simple_list(SAFRAS_FILE))

@app.route('/api/safras', methods=['POST'])
def add_safra():
    safras = load_simple_list(SAFRAS_FILE)
    safra = request.json.get('safra')
    if safra and safra not in safras:
        safras.append(safra)
        save_simple_list(SAFRAS_FILE, safras)
    return jsonify({'success': True})

@app.route('/api/safras/<safra>', methods=['DELETE'])
def delete_safra(safra):
    safras = load_simple_list(SAFRAS_FILE)
    safras = [s for s in safras if s != safra]
    save_simple_list(SAFRAS_FILE, safras)
    return jsonify({'success': True})

@app.route('/api/codigos', methods=['GET'])
def get_codigos():
    return jsonify(load_codigos())

@app.route('/api/codigos', methods=['POST'])
def add_codigo():
    codigos = load_codigos()
    codigo = request.json.get('codigo')
    origem = request.json.get('origem') or 'Receita'
    # Migra todos os códigos antigos para o novo formato
    codigos_migrados = []
    for c in codigos:
        if isinstance(c, dict):
            codigos_migrados.append({'codigo': c.get('codigo', str(c)), 'origem': c.get('origem', 'Receita')})
        else:
            codigos_migrados.append({'codigo': str(c), 'origem': 'Receita'})
    if codigo and not any(c['codigo'] == codigo for c in codigos_migrados):
        codigos_migrados.append({'codigo': codigo, 'origem': origem})
    save_codigos(codigos_migrados)
    return jsonify({'success': True})

@app.route('/api/codigos/<codigo>', methods=['DELETE'])
def delete_codigo(codigo):
    codigos = load_codigos()
    codigos = [c for c in codigos if c['codigo'] != codigo]
    save_codigos(codigos)
    return jsonify({'success': True})

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def static_files(filename):
    if os.path.exists(filename):
        return send_from_directory('.', filename)
    return '', 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

import os
print(os.getcwd())