    function radToDeg(rad) {
      return rad * (180/Math.PI);
    }

    function handsAreTouching(hands) {
      var diff = Leap.vec3.distance(hands[0].palmPosition, hands[1].palmPosition);
      //handCount.innerHTML += '</br> hand diff == ' + diff;
      return diff < 70;
    }

    function handIsUpright(hand) {
      return !!hand && (radToDeg(hand.pitch()) > 70);
    }

    function isDrifting(hands) {
      var flatHand = undefined,
          fistHand = undefined,
          criteria;

      if (hands.length !== 2) {
        return false;
      }

      hands.forEach(function(hand, index) {
        if (hand.grabStrength < 0.2) {
          flatHand = hand;
        } else if (hand.grabStrength > 0.9) {
          fistHand = hand;
        }
      });

      criteria = {
        fistHand: !!fistHand,
        flatHand: !!flatHand,
        handsTouching: handsAreTouching(hands),
        flatHandUpright: handIsUpright(flatHand)
      };

      return criteria.fistHand && criteria.handsTouching && criteria.flatHandUpright;
    }