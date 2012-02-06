# Bok
Bokförings app: enkelt, snabbt, tillgängligt, modernt, snyggt



## UI TO-DO efter research
#### Inkomst:
- Byta namn på inkomst till intäkt? Passar nog bättre tillsammans med "utgift"
- Ta bort "(kund)" från inkomst titel-labeln (finns i placeholdern)
 - Placeholder: "Faktura 20: Kundnamn"
- Lägga till fyra alternativ för momsen: 25%, 12%, 6%, 0%

#### Utgift:
- Lägga till fyra alternativ för momsen: 25%, 12%, 6%, 0%

#### Löneuttag:
- Byta namn till eget uttag? nackdelen är att vi måste fråga om moms då, PGA att egna uttag kan va momsfira (typ hälsostuff)
 - Tycker inte vi byter namn, ska man bokföra något sånt kan det göras som utgift 
- När man skriver summan, visa ett "Du får XX kr i fickan"

#### Setup/settings:
- Vi borde nog fråga om hur mycket skatt man ska pröjsa
 - Botta mot den [här?]http://www.hurmycketskatt.se/
 - ganska stor skillnad mellan skatten i [olika städer]http://www.hurmycketskatt.se/InkomstSkatt/toplist
- Bestämma standard moms

#### Misc:
- Större list-händelser som visar datum, pris, moms, pris med moms
- Antingen lägga till ännu inputmöjlighet (noo) för prellskatt eller sätta den som en automatisk utgift.
- Göra egna placeholders för att garantera att syns och inte försvinner onfocus
- lägg till "(ex moms)" i summa placeholder



## To-do efter hackaton:
- Login och registrering
 - checkbox: dubbelkolla lösenord
 - kryptera lösenorden
 - front-end validering
   - validera att båda är giltiga
   - när mail finns, men lösen fel = markera lösen fel
 - Ta bort page refresh när man loggar ut
 - Remember me
- WF till sajtdelen
- Implementera klart alla inputs
 - Int. ska skrivas
- WF till inputs
- Hjälptext system
 - Front-end
 - Back-end
- WF till bokföringen
- Hämta in data
 - Scrolla för att ladda in flera
- Overall design, typografi, färgpalett
- Demo konto med lorem ipsum data
- Komma på ett namn
- Mobilanpassning

## Data

### Users
- Email
- Password

- Företagsnamn
- Moms-default


### Payments
- namn
- datum
- summa
- moms
- payment_type : 0 = in / 1 = ut
- ver_id



## Features
**Query interface:**
Keywords

Action:

- Bevaka
- Visa

Finders/Antal

- 5
- senaste
- alla

Typ

- Inbetalningar
- Utbetalningar
- Löneuttag

Where

- Datum ranges
- Summor högre än
- Innehåller

Exempel

- Bevaka utbetalningar som innehåller "mat" 
- Visa senaste utbetalningar där summan är högre än 5000
- Visa alla
- Visa utbetalningar där summan är mellan 1000 och 5000


**Senaste händelser:**
3 senaste sorterat på VER ID.

"Kategorier" genom att skriva [KATEGORI]:[TITEL] i titelfältet
