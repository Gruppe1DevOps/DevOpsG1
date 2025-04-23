# DevOps Aufgabenstellung 1

Member:
      Harald Beier
      Susanne Peer
      Patrick Prugger
      Philipp Palatin

Gruppengröße die bereits geformten Teams
Alle verwendeten Quellen sind anzugeben.
Abzugeben bis zum 04.05.2025 um 23:59 Uhr
Abgabe = ein PDF-Dokument der gesamten Gruppe in folgendem Schema
                      
      SS2025_DevOps_ILV_Gruppe_[Gruppenbuchstabe]_Aufgabe_1 beispielsweise
      240223_DevOps_ILV_Gruppe_A_Aufgabe_1 für die Gruppe A

Bei Fragen kontaktiert mich gerne per E-Mail: stefan.taucher@fh-burgenland.at
Aufgabenstellung siehe Datei "Aufgabe.pdf".


## Teilbereich Build and Code

1) Welche bereits vorgestellten bzw. zusätzlich recherchierte Vorgehensmodelle ermöglichen ein schnelles Iterieren und somit die Möglichkeit Feedback zeitnah durch die jeweiligen Stakeholder einzubringen? Zusätzlich soll auch darauf eingegangen werden, weshalb die gewählten Vorgehensmodelle dies im Vergleich zu anderen Modellen ermöglichen.

2) Beschreiben Sie mindestens 3 Praktiken aus Extreme Programming im Detail und den Einfluss die diese Praktik auf die Softwareentwicklung und dem Ergebnis haben.

3) Lesen Sie den Artikel https://blog.crisp.se/wp-content/uploads/2012/11/SpotifyScaling.pdf 
    Diese Informationen fassen Sie bitte in 1 bis maximal 2 Seiten zusammen.

4) Beschreiben Sie Git im Detail sowie mindestens 2 Features im Detail.

5) Welche qualitätssteigenden Maßnahmen kennen Sie? Beschreiben Sie 2 beliebige im Detail.

## Teilbereich DevOps

Das Unternehmen ABC Ad Tech stellt eine SaaS-Lösung für Kunden bereit mit denen ihre
Werbekampagnen verwaltet werden können.
Aktuell gibt es ein Entwicklungsteam namens "Ad-Dev" mit 5 Personen die gemeinsam die
Lösung entwickeln. Der Source Code ist hierzu in git abgelegt. Der Output des Build-Prozesses (=Artefakt) wird auf dem Firmen-PC von einem speziellen Mitarbeiter erstellt und dann händisch auf eine Netzwerkdateifreigabe kopiert.
Für die Kunden wird die Lösung aktuell durch das Team namens "Ad-Ops" betrieben.
Die beiden Teams arbeiten unabhängig voneinander.
Das Entwicklungsteam "Ad-Dev" liefert alle 3 Monate eine neue "Produktivversion" und alle zwei Woche eine neue "Testversion". Beide werden von Team "Ad-Ops" bei Verfügbarkeit eingespielt, d.h. es wird das Artefakt von der Netzwerkdateifreigabe herunterkopiert und dann "händisch" eingespielt. Die "Testversion" kommt immer auf eine Staging-Umgebung, welche vom Team "Ad-QS" getestet wird und anschließend wird das Feedback mittels einer Besprechung an die Entwicklung rückgemeldet. Auch die "Produktivversion" wird zuerst auf der Staging-Umgebung getestet und sobald die Freigabe seitens "Ad-QS" gegeben wird erfolgt die Einspielung auf das Produktivsystem durch das Team "Ad-Ops". Bei Problemen und sonstigen Auffälligkeiten wird vom Team "Ad-Ops" aus Kontakt mit dem Entwicklungsteam "Ad-Dev" aufgenommen.

#### Aufgaben:

1) Beschreibe kurz mögliche Probleme in der aktuellen Organisation und Arbeitsaufteilung.

2) Beschreibe die notwendigen Schritte um in dieser Organisation DevOps (bis einschließlich Continuous Delivery) einzuführen.

3) Welche Schritte sind in welcher Reihenfolge notwendig?

4) Welche Tools werden hierzu benötigt?

Beachte das solche Änderung Schritt für Schritt eingeführt werden müssen damit diese
erfolgreich sein können. Ebenso müssen die wesentlichen Stakeholder überzeugt werden.
Identifiziere die wesentlichen Stakeholder und liefere ihnen Argumente, die sie davon
überzeugen das die Einführung von DevOps Praktiken vorteilhaft ist.
