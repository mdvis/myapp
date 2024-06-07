#! /usr/bin/env python3
# -*- coding: utf-8 -*-
'''date: 2023-06-20
'''

# Only needed for access to command line arguments
import sys

from main import MainWindow
from PyQt6.QtWidgets import QApplication, QMainWindow, QPushButton, QWidget

app = QApplication(sys.argv)

# window = QWidget()
# window = QPushButton("666")
# window = QMainWindow()
window = MainWindow()
window.show()  # IMPORTANT!!!!! Windows are hidden by default.

app.exec()
