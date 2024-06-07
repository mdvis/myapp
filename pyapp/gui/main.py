#! /usr/bin/env python3
# -*- coding: utf-8 -*-
'''date: 2023-06-20
'''

from PyQt6.QtCore import QSize
from PyQt6.QtWidgets import QMainWindow, QPushButton


class MainWindow(QMainWindow):
    '''main
    '''

    def __init__(self):
        super().__init__()
        self.setWindowTitle("Test")
        self.setFixedSize(QSize(300, 400))
        button = QPushButton("Button")
        button.setFixedSize(QSize(60, 40))
        self.setCentralWidget(button)
