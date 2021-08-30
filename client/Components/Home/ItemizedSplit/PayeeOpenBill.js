/*
see figma for visual reference:
    1) get bill picture
    
    2) show text field with add button next to it
    
    3) when payee types in line item & hits add, it shows all the line items being added + total at very bottom
        if current items is: 3.50
        and they add 4.20 to it, then below the text field would show '$3.50 + $4.20'
        and the running total one line below that would show '$7.70'
        
    4) have done button that sends data to db & in-turn updates owner's open bill view
        sent to db in the bill's parsedBill field in the format of:
            {payeeName: [3.50, 4.20]} 
            or maybe just {payeeName: 7.70}?
*/