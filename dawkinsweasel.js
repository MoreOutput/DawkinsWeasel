/**
* Dawkins Weasel Program
* Written by Rocky Bevins (moreoutput@gmail.com)
*/
function weasel() {
	"use strict";
	var TARGET_STR = 'METHINKS IT IS LIKE A WEASEL', 
    CURRENT_STR = 'WDLTMNLTDTJBKWIRZREZ L MGQOPS', 
    cnt = 0,

    randBetween = function(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    },

    /**
    * Mutate a character.
    */
    mutate = function(alpha) {
        var charArr = ['A','B','C','D','E','F','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' '], 
        rnd = randBetween(0, charArr.length),
        i = 0;

        for (i; i < charArr.length; i += 1) {
            if (i === rnd) {
				alpha = null;
                return charArr[i];
            }
        }
    },

    /**
    * Create a modified substring of CURRENT_STR
    */
    createChild = function() {
	   var i = 0,
       cnt = 0,
       tempStr = CURRENT_STR.split(''),
       percent = 0;

    	for (i; i < CURRENT_STR.length + 1; i += 1) {
    		if (cnt !== tempStr.length) {
    			percent = randBetween(1, 20); // mutation
    			if (percent <= 1) {
    				tempStr[i] = mutate(tempStr[i]);
    			}
    			cnt += 1;
    		} else {
    			return tempStr.toString().replace(/,/g, '');
    		}
    	}
    },

    /**
    * Score a string, 28 (perfect target match) is the top score
    */
    score = function(str) {
        var i = 0,
        total = 0;

        for (i; i < TARGET_STR.length; i += 1) {
            if (str[i] === TARGET_STR[i]) {
                total += 1;
            }
        }

        return total;
    },

    /**
    * Create one generation of 100 progeny based on the CURRENT_STR
    */
    evolveString = function(str) {
        var progeny = [],
        currentScore = 0,
        i = 0,
        cnt = 0,
        tempScore = 0;

        for (i; i < 100; i += 1) {
            progeny[i] = createChild();
        }

        i = 0;

        for (i; i < progeny.length; i += 1) {
            tempScore = score(progeny[i]);

            if (tempScore > currentScore) {
                currentScore = tempScore;
                cnt = i;
            }
        }
	
    	str = null;
   
        return progeny[cnt];
    };

    while (score(CURRENT_STR) < 28) {
        CURRENT_STR = evolveString();
        cnt += 1;
        console.log(CURRENT_STR);
    }
}

weasel();