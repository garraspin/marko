var marklogic = require('marklogic');
var findOne = require('./arrayUtils').findOne;
var findOneIndex = require('./arrayUtils').findOneIndex;
var findPatternIndex = require('./arrayUtils').findPatternIndex;
var findAll = require('./arrayUtils').findAll;
var db = marklogic.createDatabaseClient({
    host: 'localhost',
    port: '6000',
    user: 'admin',
    password: 'admin',
});
var queryBuilder = marklogic.queryBuilder;

var woman = ["female", "females", "women", "woman"];
var man = ["male", "males", "man", "men"];
var countries = ["afghanistan","aland islands","albania","argentina","armenia","australia","azerbaijan","bahrain","bangladesh","barbados","belarus","bhutan","bolivia","bosnia and herzegovina","botswana","brazil","bulgaria","burkina faso","burundi","cambodia","cameroon","canada","cape verde","chad","chile","china","colombia","comoros","croatia","cuba","cyprus","czech republic","democratic republic of the congo","denmark","dominica","dominican republic","ecuador","egypt","el salvador","ethiopia","finland","france","french polynesia","gambia","georgia","germany","greece","guam","guatemala","honduras","hungary","iceland","indonesia","iran","ireland","israel","italy","ivory coast","jamaica","japan","kazakhstan","kenya","kuwait","kyrgyzstan","laos","latvia","lebanon","lesotho","libya","lithuania","macao","macedonia","madagascar","malaysia","maldives","mali","malta","martinique","mauritania","mauritius","mexico","mongolia","montenegro","morocco","myanmar","nauru","nepal","netherlands","new zealand","niger","nigeria","north korea","norway","pakistan","palestinian territory","panama","papua new guinea","paraguay","peru","philippines","poland","portugal","reunion","russia","samoa","saudi arabia","serbia","slovenia","somalia","south africa","south korea","sudan","suriname","sweden","switzerland","syria","tanzania","thailand","tunisia","turkey","uganda","ukraine","united arab emirates","united kingdom","united states","uruguay","uzbekistan","venezuela","vietnam","yemen","zimbabwe"];
var race = ["alaska native","alaskan athabascan","aleut","american indian","american indian and alaska native ","apache","argentinian","asian","asian indian","bangladeshi","black or african american","blackfeet","bolivian","cambodian","central american","chamorro","cherokee","cheyenne","chickasaw","chilean","chinese","chippewa","choctaw","colombian","colville","comanche","costa rican","cree","creek","crow","cuban","delaware","dominican ","ecuadorian","eskimo","fijian","filipino","guamanian","guatemalan","hmong","honduran","houma","indonesian","iroquois","japanese","kiowa","korean","laotian","latin american indian","lumbee","malaysian","melanesian","menominee","mexican","micronesian","native hawaiian","native hawaiian and other pacific islander ","navajo","nicaraguan","osage","ottawa","paiute","pakistani","panamanian","paraguayan","peruvian","pima","polynesian","potawatomi","pueblo","puerto rican","puget sound salish","salvadoran","samoan","seminole","shoshone","sioux","south american","spaniard","sri lankan","taiwanese","thai","tlingit","tohono o","tongan","uruguayan","ute","venezuelan","vietnamese","white","yakama","yaqui","yuman"];

var queryByAge = {
    query: (words, q) => {
        var index = findPatternIndex(words, /\d+/);
        if (index == -1) {
            return {};
        } else {
            var age = parseInt(words[index], 10);
            if (findOne(words, ["less"])) {
                return {age : {$gt: age}, $filtered: true};
            } else if (findOne(words, ["more"])) {
                return {age : {$gt: age}, $filtered: true};
            } else {
                return {age : age};
            }
        }
    }
};
var queryByRace = {
  query: (words, q) => {
      var index = findOneIndex(words, race);
      if (index > -1) {
          return { race: words[index] };
      } else {
          return {};
      }
  }
};
var queryByCountry = {
  query: (words, q) => {
      var index = findOneIndex(words, countries);
      if (index > -1) {
          return { country: words[index] };
      } else {
          return {};
      }
  }
};
var queryByGender = {
  query: (words, q) => {
      if (findOne(words, woman)) {
          return { gender: "Female" };
      } else if (findOne(words, man)) {
          return { gender: "Male" };
      } else {
          return {};
      }
  }
};

const queryTypes = [queryByGender, queryByCountry, queryByAge];

var buildQueryBuilder = (words, q) => {
    var qs = queryTypes.map(builder => builder.query(words, q));
    return queryBuilder.where(queryBuilder.byExample(...qs));
};

var mldb = {
    search: (words, q) => db.documents.query(buildQueryBuilder(words, q)).result()
};

// mldb.search(["okay", "michael", "search", "25", "women", "china"], "").then(d => d.forEach(obj => console.log(JSON.stringify(obj.content))));
// console.log(queryByCountry.query(["okay", "michael", "serbia", "women"], ""));
// console.log(queryByAge.query(["okay", "michael", "less", "25"], ""));

module.exports = mldb;