Pr ojectD ocumentation 

 
Q A A utomationC hallenge
 
This doc um entex plainshow to install, c onf igure,andrun theautom atedtests dev eloped 
f ortheU serM anagem entprojec t,w hic hc onsistsof :
 
-
 
AN ode.js + Ex pressbac k end(API)
 
-
 
AR eac tf rontendU I
 
-
 
Autom atedAPItests using Postm anand N ew m an
 
-
 
Autom atedU Itests using C y press
 
-
 
R eporting w ithM oc haw esom e
 
-
 
C odew rittenin J av aSc ript
 
T echnologiesU sed
 
Tool /Library  
-
 
Purpose
 
N ode.js  
-
 
Bac k endserv erruntim e
 
Ex press  
-
 
APIf ram ew ork f orN ode.js
 
R eac t 
-
 
Frontend U If ram ew ork
 
Postm an  
-
 
M anualandautom ated APItesting
 
N ew m an 
-
 
C LIrunnerf orPostm anc ollec tions
 
C y press  
-
 
End
-
to
-
endU Itest f ram ew ork
 
M oc haw esom e 
-
 
H TM Lreportgenerationf orC y press
 
J av aSc ript 
-
 
Program m inglanguageused inall lay ers
 
A PIT esting(qa
-
backend+ postman
-
tests)
 
Installation
 
c dqa
-
bac k end
 
npm install
 
npm start
 
Bac k endw illrunat:http://loc alhost:3001
 
 
R unA PIT ests(w ithN ew man)
 

c d../postm an
-
tests
 
new m anrunuser
-
m anagem ent.postm an_c ollec tion.json 
-
e 
env .postm an_env ironm ent.json 
-
rc li,htm l 
--
reporter
-
htm l
-
ex portreport.htm l
 
This w ill:
 
-
 
R unall APItests.
 
-
 
Ex portareadable H TM Lreportasreport.htm l
 
Fr ontendT esting(qa
-
fr ontend+ C ypr ess)
 
Installation
 
c d../qa
-
f rontend
 
npm install
 
npm start
 
Frontend w illrun at: 
http://loc alhost:3000
 
 
R u n U IT e s ts w ith C y p re s s
 
 
O ption1:C ypr essG U I
 
npx c y pressopen
 
O ption2: 
H eadlessmodew ithr epor t
 
npx c y pressrun 
--
reporterm oc haw esom e 
--
reporter
-
options 
reportD ir= c y press/reports,ov erw rite= f alse,htm l= true,json= true
 
This w ill:
 
-
 
R unall tests autom atic ally .
 
-
 
G enerateadetailed reportin c y press/reports/
 
 
T estC over age& R epor ts
 
U IT estScenar ios
 
-
 
Login w ithv alid/inv alid c redentials 
 
-
 
C reateanew user
 

-
 
U pdatean ex isting user
 
-
 
D eletea user
 
-
 
Prev entduplic ateem ails
 
-
 
Validate required f ields
 
-
 
List users
 
-
 
H andle APIerrors
 
-
 
Form v alidationf orem pty f ields
 
A PI 
T estScenar ios
 
-
 
PO ST/login
 
-
 
G ET/users
 
-
 
PO ST/users
 
-
 
PU T/users/:id
 
-
 
D ELETE/users/:id
 
-
 
Positiv eand negativ e c asesf orallendpoints
 
Q u ic k S ta rt
 
#Star tB ackend
 
c dqa
-
bac k end
 
npm install
 
npm start
 
#Star tFr ontend
 
c d../qa
-
f rontend
 
npm  
install
 
npm start
 
#R unA PIT ests
 
c d../postm an
-
tests
 
new m anrunuser
-
m anagem ent.postm an_c ollec tion.json 
-
e 
env .postm an_env ironm ent.json 
-
rc li,htm l 
--
reporter
-
htm l
-
ex portreport.htm l
 

#R unU IT ests(H eadless)
 
c d../qa
-
f rontend
 
npx c y pressrun 
--
reporterm oc haw esom e 
--
reporter
-
options 
reportD ir= c y press/reports,htm l= true
 
N otes
 
-
 
Thebac k endandf rontendm ustboth berunning f orC y pressteststo w ork c orrec tly .
 
-
 
Postm anand N ew m antestsrequireuser
-
m anagem ent.postm an_c ollec tion.json and 
env .postm an_env ironm ent.json.
 
-
 
C y presstest reportsare sav edasH TM LandJ SO N f oreasy rev iew .
 

