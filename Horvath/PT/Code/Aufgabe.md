• Zuweisungen für die CI/CD Plattform, Automation Framework und Variation bitte hier eintragen  
https://onedrive.live.com/:x:/g/personal/D0011BB8548D4C58/EYzereDKXFxIskgVrdHjm4ABYAOzEPNEYpmT5_f07sCnlw?resid=D0011BB8548D4C58!se0adde8c5cca485cb24815add1e39b80&ithint=file%2Cxlsx&e=Q54dwH&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3gvYy9kMDAxMWJiODU0OGQ0YzU4L0VZemVyZURLWEZ4SXNrZ1ZyZEhqbTRBQllBT3pFUE5FWXBtVDVfZjA3c0NubHc_ZT1RNTRkd0g

Gewählt wurden:
CI/CD Platform
Platform: GitHub Actions

Automation Framework
Wdio

Website zum Testen:
https://sampleapp.tricentis.com/101/

---

Ziel der Aufgabe ist es die Tricentis Vehicle Insurance App zu automatisieren.

Dabei soll der End to end flow der web app automatisiert werden, welcher folgende Schritte beinhaltet:

    Enter Vehicle Data --> Home --> Automobile Insurance --> Enter Vehicle Data
    Enter Insurant Data --> Home --> Automobile Insurance --> next
    Enter Product Data --> Home --> Automobile Insurance -->  next
    Select Price Option --> Home --> Automobile Insurance --> next
    Send Quote --> Home --> Automobile Insurance --> next

Jede Gruppe soll mindestens eines der folgenden Attribute variieren:

    Merit Rating --> Enter Product Data
    Damage Insurance --> Enter Product Data
    Optional Products --> Enter Product Data
    Courtesy Car --> Enter Product Data
    Price Options

Zusätzlich sind folgende Validierungen durchzuführen:

    Price Per Year für die selektierte Price Option (Silver, Gold, Platinum, etc.)
    Bestätigung dass die Anfrage abgesendet wurde

Die automatisierten Tests sind in einer CI/CD Platform zu integrieren, wobei jede Gruppe eine andere Platform wählt. In der Pipeline Konfiguration sind mindestens folgende Anforderungen zu erfüllen:

    Die Pipeline erlaubt Tests auf einem lokalen Browser auszuführen (Google Chrome)
    Die Pipeline erlaubt Tests auf mehreren Remote Browsers auszuführen (Bsp.: Chrome, Firefox, Opera, Edge, Safari)
    Es wird ein Test Report für jeden Pipeline-Lauf als Artefakt abgespeichert

Abzugeben sind:

    Projektdokumentation, welche alle Konfigurationsschritte beinhaltet
    Diese Schritte müssen für eine Person mit dem Kenntnisstand eines IT-Bachelor Abschlusses nachvollziehbar sein und sollen detailliert genug sein, dass so eine Person das Projekt mit dieser Dokumentation durchführen kann.

Desweiteren ist das Projekt im Rahmen einer Live Demo zu präsentieren.

img src="../Screenshot 2025-06-09 100644.jpg" alt="Screenshot" title="Screenshot" />

---

• URL zu der Web App http://sampleapp.tricentis.com/101/
• Video Recording zum end to end flow kann hier gefunden werden https://login.live.com/login.srf?wa=wsignin1%2E0&rpsnv=176&ct=1749456295&rver=7%2E5%2E2146%2E0&wp=MBI%5FSSL&wreply=https%3A%2F%2Fonedrive%2Elive%2Ecom%2F%5Fforms%2Fdefault%2Easpx%3Fapr%3D1&lc=1031&id=250206&guests=1&wsucxt=1&cobrandid=11bd8083%2D87e0%2D41b5%2Dbb78%2D0bc43c8a8e8a&aadredir=1
