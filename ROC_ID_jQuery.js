
//------------------------------產生Function------------------------------
function ROC_ID_Generator(ROC_ID) {
    if (ROC_ID == null) {
        ROC_ID = '';
    }

    var ROC_ID_len = ROC_ID.length;
    if (ROC_ID_len == 0) {
        //隨機產生縣市代碼對應數字
        var City_Code_Num = City_Code_to_Num(Get_City_Code());
        var ROC_ID_Remain = 8; //剩餘長度(不含驗證碼)
        var ROC_ID_No_Verify_Code = City_Code_Num;
    }
    else if (ROC_ID_len > 0 && ROC_ID_len < 10) {
        if (/^[12]$/.test(ROC_ID.substr(1, 1)) == false && ROC_ID_len > 1) {
            alert('第二個字需為1或2!');
            exit();
        }
        //產生縣市代碼對應數字
        var City_Code = ROC_ID.substr(0, 1); 
        var City_Code_Num = City_Code_to_Num(City_Code);
        var ROC_ID_Remain = 8 - ROC_ID.substr(1).length;
        var ROC_ID_No_Verify_Code = City_Code_Num + ROC_ID.substr(1);
    }
    else if (ROC_ID_len == 10) {
        //驗證身分證號
        if (ROC_ID_Check(ROC_ID) == true) {
            return ROC_ID + '為有效號碼!';
        }
        else {
            return ROC_ID + '為無效號碼!';
        }
    }
    else if (ROC_ID_len > 10) {
        alert('身分證號最多10碼!');
        exit();
    }
    else { }

    //隨機產生數字至10位數
    for (var i = 0; i < ROC_ID_Remain; i++) {
        if (ROC_ID_Remain == 8 && i == 0) {
            //隨機產生性別代號
            ROC_ID_No_Verify_Code = ROC_ID_No_Verify_Code + Get_Sex_Code();
        } else {
            //隨機產生數字
            ROC_ID_No_Verify_Code = ROC_ID_No_Verify_Code + Math.floor(Math.random() * 10).toString();
        }
    }

    //加上驗證碼
    var ROC_ID_Num_Array = ROC_ID_No_Verify_Code.split("");
    var total = parseInt(ROC_ID_Num_Array[0]);
    var Mult_Num = 9; //目前乘數
    for (var i = 1; i < 10; i++) {
        total += (parseInt(ROC_ID_Num_Array[i]) * Mult_Num);
        Mult_Num--;
    }
    var Verify_Code = 10 - (total % 10);
    if (Verify_Code == 10) {
        Verify_Code = 0;
    }
    var ROC_ID_New_Num = ROC_ID_No_Verify_Code + Verify_Code;

    //縣市代碼對應數字反轉成縣市代碼
    var City_Code_Num = ROC_ID_New_Num.substr(0, 2);
    var City_Code;
    var Num_Code = City_Code_to_Num_Array();
    for (var Code in Num_Code) {
        if (Num_Code[Code] == City_Code_Num) {
            City_Code = Code;
        }
    }
    var ROC_ID_New = City_Code + ROC_ID_New_Num.substr(2);
    return ROC_ID_New;
}

//隨機選取縣市代號
function Get_City_Code() {
    var City_Code = "ABCDEFGHIJKMNOPQTUVWXZ".split("");  //縣市代號，不包含已停發
    return City_Code[Math.floor(Math.random() * City_Code.length)];
}

//隨機選取性別代號
function Get_Sex_Code() {
    var Sex_Code = "12".split("");//性別代號 
    return Sex_Code[Math.floor(Math.random() * Sex_Code.length)];
}


//------------------------------驗證Function------------------------------
function ROC_ID_Check(ROC_ID) {
    if (ROC_ID == null || ROC_ID == '') {
        alert('身分證號為空值!');
        exit();
    }

    return Validate_ROC_ID(City_Code_to_Num(ROC_ID.substr(0, 1)) + ROC_ID.substr(1)); 
}

//轉換縣市代號為數字
function City_Code_to_Num(City_Code) {
    if (/^[a-zA-Z]$/.test(City_Code) == false) {
        alert('第一個字需為英文字母!');
        exit();
    }

    var Num_Code = City_Code_to_Num_Array(); //縣市代碼轉換數字對應資料
    return Num_Code[City_Code.toUpperCase()];
}

//驗證公式
function Validate_ROC_ID(ROC_ID_Num) {
    if (/^[0-9]{11}$/.test(ROC_ID_Num) == false) {
        alert('身分證號不正確!');
        exit();
    }

    //公式 
    //A123456789 = 10123456789
    //( 1*1 + 0*9 + 1*8 + 2*7 + 3*6 + 4*5 + 5*4 + 6*3 + 7*2 + 8*1 + 9 ) % 10 = 0
    var ROC_ID_Num_Array = ROC_ID_Num.split("");
    var total = parseInt(ROC_ID_Num_Array[0]) + parseInt(ROC_ID_Num_Array[10]); 
    var Mult_Num = 9; //目前乘數
    for (var i = 1; i < 10; i++) {
        total += (parseInt(ROC_ID_Num_Array[i]) * Mult_Num);
        Mult_Num--;
    }

    if (total % 10 == 0) {
        return true;
    }
    else {
        return false;
    }
}

//縣市代碼對應數字表
function City_Code_to_Num_Array() {
    var City_Code_to_Num = new Array();
    City_Code_to_Num['A'] = 10; //台北市
    City_Code_to_Num['B'] = 11; //台中市
    City_Code_to_Num['C'] = 12; //基隆市
    City_Code_to_Num['D'] = 13; //台南市
    City_Code_to_Num['E'] = 14; //高雄市 
    City_Code_to_Num['F'] = 15; //新北市
    City_Code_to_Num['G'] = 16; //宜蘭縣
    City_Code_to_Num['H'] = 17; //桃園縣
    City_Code_to_Num['I'] = 34; //嘉義市
    City_Code_to_Num['J'] = 18; //新竹縣
    City_Code_to_Num['K'] = 19; //苗栗縣
    City_Code_to_Num['L'] = 20; //台中縣(停發)
    City_Code_to_Num['M'] = 21; //南投縣
    City_Code_to_Num['N'] = 22; //彰化縣
    City_Code_to_Num['O'] = 35; //新竹市
    City_Code_to_Num['P'] = 23; //雲林縣
    City_Code_to_Num['Q'] = 24; //嘉義縣
    City_Code_to_Num['R'] = 25; //台南縣(停發)
    City_Code_to_Num['S'] = 26; //高雄縣(停發)
    City_Code_to_Num['T'] = 27; //屏東縣
    City_Code_to_Num['U'] = 28; //花蓮縣
    City_Code_to_Num['V'] = 29; //台東縣
    City_Code_to_Num['W'] = 32; //金門縣
    City_Code_to_Num['X'] = 30; //澎湖縣
    City_Code_to_Num['Y'] = 31; //陽明山(停發)
    City_Code_to_Num['Z'] = 33; //連江縣
    return City_Code_to_Num;
}
