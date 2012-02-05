# Bok
Bokförings app: enkelt, snabbt, tillgängligt, modernt, snyggt

### To-do efter hackaton:
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
----------
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
