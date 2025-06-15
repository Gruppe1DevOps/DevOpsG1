# DevOps Projekt - Tricentis Vehicle Insurance Automation

## Projektübersicht
Dieses Projekt demonstriert die Implementierung einer vollständigen CI/CD-Pipeline mit End-to-End-Tests für die Tricentis Vehicle Insurance Anwendung. Die Automatisierung wurde von Gruppe 1 (Harald Beier, Susanne Peer, Patrick Prugger, Philipp Palatin) entwickelt.

## Kernfunktionen
- **Multi-Browser Testing**: Automatisierte Tests in Chrome und Edge
- **CI/CD Pipeline**: GitHub Actions Workflow für kontinuierliche Integration
- **End-to-End Tests**: 16 Test-Szenarien mit WebdriverIO
- **Datengetriebene Tests**: Dynamische Testgenerierung basierend auf verschiedenen Versicherungsszenarien

## Technische Highlights
1. **GitHub Actions Workflow**
   - Automatische Testausführung bei Push und Pull Requests
   - Browser-Matrix für parallele Testausführung
   - Automatische Artefakt-Generierung

2. **Test-Automatisierung**
   - 5-stufiger Testablauf (Fahrzeugdaten → Versicherungsnehmer → Produktdaten → Preisoption → Angebot)
   - Validierung von Preiskalkulationen
   - Cross-Browser Kompatibilität

3. **Test-Szenarien**
   - 16 verschiedene Testfälle
   - Validierung von Preiskalkulationen
   - Überprüfung von Versicherungsoptionen

## Repository
GitHub Repository: [https://github.com/Gruppe1DevOps/DevOpsG1/tree/main/Horvath/PT](https://github.com/Gruppe1DevOps/DevOpsG1/tree/main/Horvath/PT)

## Testumgebung
- **URL**: https://sampleapp.tricentis.com/101/
- **Browser**: Chrome, Edge
- **Test Framework**: WebdriverIO
- **CI/CD**: GitHub Actions

## Dokumentation
Die vollständige Dokumentation, einschließlich Sequenzdiagramme und Flussdiagramme, ist im README.md des Projekts verfügbar.