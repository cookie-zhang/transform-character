/*
 * @Author: zhangjianfei
 * @Email:
 * @Date: 2022-04-07 11:45:15
 * @LastEditors: zhangjianfei
 * @LastEditTime: 2022-04-08 17:50:58
 * @Description: 简体字、繁体字互相转化
 */
const character = require('../lang/zh.js');
const simplified = character.simplified;
const traditional = character.traditional;

const getType = (obj) => {
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
};

 
/**
* @param {String} content 待转换的文本
* @param {String} characterType 转换对象 zh-TW：简体转换成繁体  zh-CN：繁体转换成简体
* @returns {String} result 转换结果
*/
 
function transformCharacter (content, characterType) {
    let simplifiedStr='',traditionalStr='',transformCharacterResult='';
    let type = getType(content)
    if (characterType === 'zh-TW') {
      simplifiedStr = simplified;
      traditionalStr = traditional;
    } else {
      traditionalStr = simplified;
      simplifiedStr = traditional;
    }
    if (type !== 'String') {
        return content;
    }
    for (let i = 0; i < content.length; i++) {
      let letter = content.charAt(i);
      let code = content.charCodeAt(i);
      let isChinese = (code > 0x3400 && code < 0x9FC3) || (code > 0xF900 && code < 0xFA6A);
      if (!isChinese) {
        transformCharacterResult += letter;
          continue;
      }
      let simplifiedStrIndex = simplifiedStr.search(letter);
        if (simplifiedStrIndex !== -1) {
          transformCharacterResult += traditionalStr.charAt(simplifiedStrIndex);
        } else {
          transformCharacterResult += letter;
        }
    }
    return transformCharacterResult;
}
 

 module.exports = transformCharacter