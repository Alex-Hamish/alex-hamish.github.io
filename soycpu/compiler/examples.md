# Here are some (working) examples

...

# Here are the ones that need to be debugged

```SoyASM
COM This gets the text input from INPUT and moves it to TEXT
MOV F3 01
MOV F1 02
MOV F2 01
MST M1 F1 F2
MOV F1 00
MOV F2 00
MST M2 F1 F2
MOV F1 20
COM this will start a loop
MAL F2 M1
MAS M2 F2
DEC F1
MAD M1 F3
MAD M2 F3
SYS 1
JNZ F1 9
```
