const https = require('https')
const options = {
  hostname: 'esube.iskur.gov.tr',
  port: 443,
  path: '/Ozgecmis/OzgecmisExternal.aspx',
  method: 'POST',
  headers: {"Cookie": `TS01282447=01241dcdd3079ded460b3a3c615f88ab9d2ce5ce05e80dbaa50c727e080346c0c913c2d0f06e23d5d2789d27bba9b7e5f18ae6bbdf10acab6766314c2e4a83e12cbb593c369f28d6be377a838e049e83f8f3928a3f05ba26a8a7aff46f21e72689dcd5563c0f1944b7954676e96354ab3e228396aa2e2f3d2cd95e12c94ec753bde6ff49ab;ASP.NET_SessionId=o3jpn3axorswwbo0vtbjg553;iskur_cookie=!q6zCCIwsarzgIBwDxwUgvq9ptZA7mEuUph/i1JPksd6/8D0WydHmObWFHR551rW2zdl0tyBcnAxSeR8=;iskurPortalEkran=normal;LanguagePreference=;LoginForm=DE470BFDBCD0FA6F6556E5878703C846752D7BEF9F21A9953A5188B95E6D9FDFEF07BA14E38A95F185596D5F279F03064C4269FEFA638C336D2DF56DCA6EFC27B6E9E51D0A8C2C21431B9FF40BA72E503547AB0B5E96BF4EE482A02AA86A3BE749B0888A4837B2EC2AF8F2AC15BD1CFE5426B0728A0D539854511CB04262F27FA0AC932ADDC98C25D018C71AB211928068CBB49B86623E581CD30DEEFEFE3DD00D4FA6236545CFB02F7DA6F4E4556674DDCD3A7FE73991D95496DD4C50CD0477129CABDE7AA9A3DBCA4AD0984AD35A024C6DAB3A233745F7DFF225C1C66CFEC6556846A04FCA81368778D6A185197B17BCE3522895553982E46FBE273F0ED931CB83B8EFB912E5748F52C1ACFF80EB96193165E0164AFD61F035DABB24613E7BEAD16D98F5BF98FF6880A6DF3571F229821B0225EE2E910C67B4C0BADA3C1E421C449E5DB977745F8256D88063C10BFA23ADA8C1F390B3EF60DC100DFC9E7670613EF449C85882068A68FA108D04E445ED7FF7776068AD0657A100F792801A7E01E51BB272679D14140D54F00F4FE6BE9DB2D3C77EBA2EB64281096B5B695A843A37AA5151A89CA1EDE8E90FA81F30508A07D8018457344DCCB96043BB159BF564C12431B5367C63F8B81472E2330DB67EDD81F8B71B4E21688E2250FCF6AB08C63C68F6F7F42374FC0A27A1CC3DE51AF04343B52228089DBE78E21FF9381DA0689821848A903BE9D70C1A94D48570CB8C709E56E8A8A3FF33E38805940D766F1AD8B6E2AF3F38CB56F002338B3ACF8556FA31611D5E26B54D947414881F413880B54A400775D3AEBB86485B7BCDC736F08448935FB5303A46DF5F0452C6857E4B6C30FD7E741666F5972FC231CFEC4A5AF7AC8CAC00DD7BB90B31C4A09A93759F70E74DDEE6CB794303FE626DD4B4401EACB8A376C33E27722C74577A8F3B2DB2D95E8C7A7DF3CC36E447D46A998B9AE8348873721064AD2C98E1EB0FC9302CC8832643468686C853CF2471DA4BDC1FE6EE01B8A15BDBC2951BE5F639F6DCB56540559EF7A9D20905EB56ABCC42EA78B94BDD492A97B295CF38B37846035F2D3EE7A249475668FF45F5744256A86CF88896C5F2E17CED6E42EFDF8E90C39C5BB88B30D3ECE828E4E3172144704B2B4E70FD699045B68F468FA2B097B85BB8300D3994BDDF9522244F10F92B47FD58EB8D837851EBC5BA624B51EB13CF5EC2D2A0335EBC4E12B30DF778F904CC46717D40BB28DA3C10A8E4D7512F5CC8F2B47019A89D8A1486686702B5D4BC0574555AD904CB8475BAC5BE15578A909858B2016CF398674399C2AF9401FF3AF46A2C0DC462448D6750922282D94278E3851253EC59AF66E97A9890832C2A438B21AA2412EBE37D404D79D0986E3F6467CBA89BE245E3021095EB3E7EBED831281F025F14D363B57D5F4BA16AFE4DF7B96F820300BDF6FA3C8F4B60AD54047A437CE94152E34BAB6684E28C1A6A80BAC43B0CA147189296EC1F853CA73157E1113311297C48D4043EDED2B2E1928D8773E5F4D851AB0416AEA9009D9E7E21FF1A6F4D4AF74B4D5BC3145C832E704BD9B13B04AED1C13FD9BA5BAB443A9492898F89931DFB4C094EF1F65F6105AF694E58C2D2ED9FB2CADAF40AB8C873F217E544BC8DC22F2CDB71;`}
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()




