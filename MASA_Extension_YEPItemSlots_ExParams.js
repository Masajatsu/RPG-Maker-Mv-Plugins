//=============================================================================
// Masa_Extension_YEPItemSlots_Traits.js
//=============================================================================

var Imported = Imported || {};
Imported.Masa_Extension_YEPItemSlots_Traits = true;

var Masa = Masa || {};
Masa.Extension_YEPItemSlots_Traits = Masa.Extension_YEPItemSlots_Traits || {};

//=============================================================================
 /*:
 * @param Suggestions or wishes?
 * @desc Write to me: Masajatsu.GameDev＠web.de
 * @default Masajatsu.GameDev＠web.de
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin expands YEP_X_ItemUpgradeSlots Plugins
 * with the function to add Traits.
 *
 * ============================================================================
 * How to setup?
 * =============
 * Just place it under "Yep_X_ItemUpgradeSlots".
 * =============
 * =============
 * How to use it?
 * =============
 * Simply use notetags as described in YEPs plugin.
 * 
 * Element Rates:
 * 
 * To add "Element Rates" write "ER: " than the index 
 * of the element in the editor (starting with index 1)
 * followed by the percentage.
 *
 * e.g: Element 1 80%
 *   <Upgrade Effect>
 *    ER: 1 80%
 *   </Upgrade Effect>
 *
 * e.g: Element 3 120%
 *   <Upgrade Effect>
 *    ER: 3 120%
 *   </Upgrade Effect>
 *
 *
 * To add "Ex-Paramters" use the abbreviations below:
 *
 * HR = Hit rate
 * ER = Evasion Rate
 * CR = Critical Rate
 * CE = Critical Evasion
 * ME = Magic Evasion
 * MR = Magic Reflection
 * CA = Counter Attack
 * HPR = HP Regeneration
 * MPR = MP Regeneration
 * TPR = TP Regeneration
 *
 * e.g: Hit Rate + 20%
 *   <Upgrade Effect>
 *    HR: +20%
 *   </Upgrade Effect>
 *
 * e.g: Evasion Rate - 5%
 *   <Upgrade Effect>
 *    ER: -5%
 *   </Upgrade Effect>
 *
 *
 * Attack Element:
 * 
 * To add "Attack Element" write "AE: " than the index 
 * of the element in the editor (starting with index 1).
 *
 * e.g: Element 1
 *   <Upgrade Effect>
 *    AE: 1
 *   </Upgrade Effect>
 *
 * e.g: Element 3
 *   <Upgrade Effect>
 *    AE: 3
 *   </Upgrade Effect>
 *
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Added Main Stat description to item (HP/MP/ATK/DEF/MATK/MDF/AGI/LUK)
 *
 * Version 1.00:
 * - Finished plugin!
 * - Element Rates
 * - Ex-Parameters
 * - Attack Element
 */
//=============================================================================

if (Imported.YEP_X_ItemUpgrades) {

//=============================================================================
Masa.Extension_YEPItemSlots_Traits.ItemManager_processIUSEffect = ItemManager.processIUSEffect;
ItemManager.processIUSEffect = function(line, mainItem, effectItem) {
    Masa.Extension_YEPItemSlots_Traits.ItemManager_processIUSEffect.call(this, line, mainItem, effectItem);
    // AE: X
    if (line.match(/AE:[ ](\d+)/i)) {
      var value = parseInt(RegExp.$1);
      return this.addTraitToItem(mainItem, 31, value, 1);
    }
    // ER: X Y%
    if (line.match(/ER:[ ](\d+)[ ](\d+)([%％])/i)) {
      var value1 = parseInt(RegExp.$1);
      var value2 = parseInt(RegExp.$2);
      return this.addTraitToItem(mainItem, 11, value1, value2/100);
    }
};

//Masa.Extension_YEPItemSlots_Traits.ItemManager_effectIUSParamRateChange = ItemManager.effectIUSParamRateChange;
ItemManager.effectIUSParamRateChange = function(item, stat, value) {
//Masa.Extension_YEPItemSlots_Traits.ItemManager_effectIUSParamRateChange.call(this, item, stat, value);
    algSign = "";
    if (value > 0){
        algSign = "+";
    }
    switch (stat) {
      //Ex-Parameters
      case 'HP':
      case 'MAXHP':
      case 'MAX HP':
        item.params[0] += value * 0.01 * baseItem.params[0];
	item.description += " (HP " + algSign + value + ")";
        break;
      case 'MP':
      case 'MAXMP':
      case 'MAX MP':
      case 'SP':
      case 'MAXSP':
      case 'MAX SP':
        item.params[1] += value * 0.01 * baseItem.params[1];
	item.description += " (SP " + algSign + value + ")";
        break;
      case 'ATK':
      case 'STR':
        item.params[2] += value * 0.01 * baseItem.params[2];
	item.description += " (ATK " + algSign + value + ")";
        break;
      case 'DEF':
        item.params[3] += value * 0.01 * baseItem.params[3];
	item.description += " (DEF " + algSign + value + ")";
        break;
      case 'MAT':
      case 'INT':
      case 'SPI':
        item.params[4] += value * 0.01 * baseItem.params[4];
	item.description += " (MAT " + algSign + value + ")";
        break;
      case 'MDF':
      case 'RES':
        item.params[5] += value * 0.01 * baseItem.params[5];
	item.description += " (MDF " + algSign + value + ")";
        break;
      case 'AGI':
      case 'SPD':
        item.params[6] += value * 0.01 * baseItem.params[6];
	item.description += " (AGI " + algSign + value + ")";
        break;
      case 'LUK':
        item.params[7] += value * 0.01 * baseItem.params[7];
	item.description += " (LUK " + algSign + value + ")";
        break;
      case 'ALL':
        for (var i = 0; i < 8; ++i) {
          item.params[i] += value * 0.01 * baseItem.params[i];
        }
        break;
      case 'CURRENT':
        for (var i = 0; i < 8; ++i) {
          if (item.params[i] === 0) continue;
          item.params[i] += value * 0.01 * baseItem.params[i];
        }
        break;
      case 'SLOT':
      case 'SLOTS':
        item.upgradeSlots += value * 0.01 * baseItem.upgradeSlots;
        break;
      case 'HR':
        item.traits.push({code: 22, dataId: 0, value: value/100});
        item.description += " (Hit Rate " + algSign + value + "%)";	
        break;
      case 'ER':
        item.traits.push({code: 22, dataId: 1, value: value/100});
        item.description += " (Evasion Rate " + algSign + value + "%)";
        break;
      case 'CR':
        item.traits.push({code: 22, dataId: 2, value: value/100});
        item.description += " (Critical Rate " + algSign + value + "%)";
        break;
      case 'CE':
        item.traits.push({code: 22, dataId: 3, value: value/100});
        item.description += " (Critical Evasion " + algSign + value + "%)";
        break;
      case 'ME':
        item.traits.push({code: 22, dataId: 4, value: value/100});
        item.description += " (Magic Evasion " + algSign + value + "%)";
        break;
      case 'MR':
        item.traits.push({code: 22, dataId: 5, value: value/100});
        item.description += " (Magic Reflection " + algSign + value + "%)";
        break;
      case 'CA':
        item.traits.push({code: 22, dataId: 6, value: value/100});
        item.description += " (Counter Attack " + algSign + value + "%)";
        break;
      case 'HPR':
        item.traits.push({code: 22, dataId: 7, value: value/100});
        item.description += " (HP Regeneration " + algSign + value + "%)";
        break;
      case 'MPR':
        item.traits.push({code: 22, dataId: 8, value: value/100});
        item.description += " (MP Regeneration " + algSign + value + "%)";
        break;
      case 'TMP':
        item.traits.push({code: 22, dataId: 9, value: value/100});
        item.description += " (TP Regeneration " + algSign + value + "%)";
        break;
    }
};

};
