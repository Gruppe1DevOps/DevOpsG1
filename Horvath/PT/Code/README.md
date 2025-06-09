# Devops G1

This is the subfolder for the courses DEVOPS PT - MCCE second semester for the lecturer Kevin Horvath and the task

## Aufgabe

**Gewählt wurden:**

> [!IMPORTANT]
> CI/CD Platform
> Platform: GitHub Actions
>
> Automation Framework
> Wdio
>
> Website zum Testen:
> https://sampleapp.tricentis.com/101/

---

**NOTE**
Ziel der Aufgabe ist es die Tricentis Vehicle Insurance App zu automatisieren. In der Pipeline Konfiguration sind mindestens folgende Anforderungen zu erfüllen:

    Die Pipeline erlaubt Tests auf einem lokalen Browser auszuführen (Google Chrome)
    Die Pipeline erlaubt Tests auf Remote Browser auszuführen
    Es wird ein Test Report für jeden Pipeline-Lauf als Artefakt abgespeichert

---

> [!NOTE]
> Dabei soll der End to end flow der web app automatisiert werden, welcher folgende Schritte beinhaltet:
>
>     Enter Vehicle Data --> Home --> Automobile Insurance --> Enter Vehicle Data
>     Enter Insurant Data --> Home --> Automobile Insurance --> next
>     Enter Product Data --> Home --> Automobile Insurance -->  next
>     Select Price Option --> Home --> Automobile Insurance --> next
>     Send Quote --> Home --> Automobile Insurance --> next
>
> Jede Gruppe soll mindestens eines der folgenden Attribute variieren:
>
>     Merit Rating --> Enter Product Data
>     Damage Insurance --> Enter Product Data
>     Optional Products --> Enter Product Data
>     Courtesy Car --> Enter Product Data
>     Price Options
>
> Zusätzlich sind folgende Validierungen durchzuführen:
>
>     Price Per Year für die selektierte Price Option (Silver, Gold, Platinum, etc.)
>     Bestätigung dass die Anfrage abgesendet wurde

---

## 📁 Projektstruktur

```
├── Code/
│   ├── .github                        # used diagramms for the laTEX document
│   ├── plantUML_Mermaid               # plantUML text part for the generation of the figures in the ILV
│   ├── test                           # laTEX tex files for the generation of the task in the ILV
│   ├── package-lock.json              # npm package lock file
│   ├── package.json                   # npm package file
│   ├── README.md                      # 🔴 You are here
│   ├── scenarios_x.csv                # PDF file with the instructions
│   ├── wdio.conf.js                   # PDF file with the instructions
│   ├── diagramms                      # PDF file with the instructions
│   ├── Latex                          # PDF file with the instructions
│   ├── Unterricht                     # PDF file with the instructions
```
