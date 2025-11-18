#!/usr/bin/env python3
"""
Script para convertir archivos PDF a Markdown.
Extrae el texto del PDF y lo formatea en Markdown básico.
"""

import os
import sys
import subprocess
import re
from pathlib import Path

def pdf_to_markdown(pdf_path, output_path=None):
    """
    Convierte un archivo PDF a Markdown usando pdftotext.
    
    Args:
        pdf_path: Ruta al archivo PDF
        output_path: Ruta de salida (opcional, por defecto usa el mismo nombre con .md)
    """
    pdf_path = Path(pdf_path)
    
    if not pdf_path.exists():
        print(f"Error: El archivo {pdf_path} no existe.")
        return False
    
    if output_path is None:
        output_path = pdf_path.with_suffix('.md')
    else:
        output_path = Path(output_path)
    
    # Extraer texto usando pdftotext
    try:
        result = subprocess.run(
            ['pdftotext', '-layout', '-nopgbrk', str(pdf_path), '-'],
            capture_output=True,
            text=True,
            check=True
        )
        text = result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Error al extraer texto del PDF: {e}")
        return False
    except FileNotFoundError:
        print("Error: pdftotext no está instalado. Instala poppler-utils.")
        return False
    
    # Procesar y formatear el texto a Markdown
    lines = text.split('\n')
    markdown_lines = []
    
    for line in lines:
        # Limpiar líneas vacías múltiples
        if not line.strip():
            if markdown_lines and markdown_lines[-1] != '':
                markdown_lines.append('')
            continue
        
        # Detectar posibles títulos (líneas cortas, mayúsculas, o con formato especial)
        stripped = line.strip()
        
        # Si la línea está en mayúsculas y es relativamente corta, podría ser un título
        if stripped.isupper() and len(stripped) < 100 and len(stripped) > 3:
            # Convertir a título con formato apropiado
            title_text = stripped.title()
            markdown_lines.append(f"## {title_text}")
        # Si la línea termina sin punto y es corta, podría ser un subtítulo
        elif not stripped.endswith('.') and len(stripped) < 80 and len(stripped) > 5:
            # Verificar si parece un título (sin puntuación al final)
            if not any(stripped.endswith(p) for p in ['.', ',', ';', ':', '!', '?']):
                markdown_lines.append(f"### {stripped}")
            else:
                markdown_lines.append(stripped)
        else:
            # Texto normal
            markdown_lines.append(stripped)
    
    # Unir las líneas
    markdown_content = '\n'.join(markdown_lines)
    
    # Limpiar espacios múltiples pero mantener estructura
    markdown_content = re.sub(r'\n{3,}', '\n\n', markdown_content)
    
    # Escribir el archivo Markdown
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        print(f"✓ Convertido: {pdf_path.name} -> {output_path.name}")
        print(f"  Tamaño: {len(markdown_content)} caracteres")
        return True
    except Exception as e:
        print(f"Error al escribir el archivo Markdown: {e}")
        return False

def main():
    """Función principal."""
    if len(sys.argv) < 2:
        print("Uso: python3 pdf-to-markdown.py <directorio_o_archivo_pdf>")
        print("Ejemplo: python3 pdf-to-markdown.py documents/extra-data/")
        sys.exit(1)
    
    input_path = Path(sys.argv[1])
    
    if input_path.is_file() and input_path.suffix.lower() == '.pdf':
        # Convertir un solo archivo
        pdf_to_markdown(input_path)
    elif input_path.is_dir():
        # Convertir todos los PDFs en el directorio
        pdf_files = list(input_path.glob('*.pdf'))
        if not pdf_files:
            print(f"No se encontraron archivos PDF en {input_path}")
            return
        
        print(f"Encontrados {len(pdf_files)} archivo(s) PDF:")
        for pdf_file in pdf_files:
            pdf_to_markdown(pdf_file)
    else:
        print(f"Error: {input_path} no es un archivo PDF ni un directorio válido.")
        sys.exit(1)

if __name__ == '__main__':
    main()

