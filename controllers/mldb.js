var marklogic = require('marklogic');
var findOne = require('./arrayUtils').findOne;
var findAll = require('./arrayUtils').findAll;
var db = marklogic.createDatabaseClient({
    host: 'localhost',
    port: '6000',
    user: 'admin',
    password: 'admin',
});
var queryBuilder = marklogic.queryBuilder;

// "Can you search for a person with name Douglas?"
// "I'm searching for people from Canada"
// "Can you find women older than 40 years old and last name Johnson?"

var name = ["named", "first name", "name"];
var lastName = ["surname", "last name"];
var woman = ["female", "females", "women", "woman"];
var man = ["male", "males", "man", "men"];
var countries = ["Afghanistan","Aland Islands","Albania","Argentina","Armenia","Australia","Azerbaijan","Bahrain","Bangladesh","Barbados","Belarus","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Chad","Chile","China","Colombia","Comoros","Croatia","Cuba","Cyprus","Czech Republic","Democratic Republic of the Congo","Denmark","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Ethiopia","Finland","France","French Polynesia","Gambia","Georgia","Germany","Greece","Guam","Guatemala","Honduras","Hungary","Iceland","Indonesia","Iran","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Kazakhstan","Kenya","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Libya","Lithuania","Macao","Macedonia","Madagascar","Malaysia","Maldives","Mali","Malta","Martinique","Mauritania","Mauritius","Mexico","Mongolia","Montenegro","Morocco","Myanmar","Nauru","Nepal","Netherlands","New Zealand","Niger","Nigeria","North Korea","Norway","Pakistan","Palestinian Territory","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Reunion","Russia","Samoa","Saudi Arabia","Serbia","Slovenia","Somalia","South Africa","South Korea","Sudan","Suriname","Sweden","Switzerland","Syria","Tanzania","Thailand","Tunisia","Turkey","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zimbabwe"];
var race = ["Alaska Native","Alaskan Athabascan","Aleut","American Indian","American Indian and Alaska Native ","Apache","Argentinian","Asian","Asian Indian","Bangladeshi","Black or African American","Blackfeet","Bolivian","Cambodian","Central American","Chamorro","Cherokee","Cheyenne","Chickasaw","Chilean","Chinese","Chippewa","Choctaw","Colombian","Colville","Comanche","Costa Rican","Cree","Creek","Crow","Cuban","Delaware","Dominican ","Ecuadorian","Eskimo","Fijian","Filipino","Guamanian","Guatemalan","Hmong","Honduran","Houma","Indonesian","Iroquois","Japanese","Kiowa","Korean","Laotian","Latin American Indian","Lumbee","Malaysian","Melanesian","Menominee","Mexican","Micronesian","Native Hawaiian","Native Hawaiian and Other Pacific Islander ","Navajo","Nicaraguan","Osage","Ottawa","Paiute","Pakistani","Panamanian","Paraguayan","Peruvian","Pima","Polynesian","Potawatomi","Pueblo","Puerto Rican","Puget Sound Salish","Salvadoran","Samoan","Seminole","Shoshone","Sioux","South American","Spaniard","Sri Lankan","Taiwanese","Thai","Tlingit","Tohono O","Tongan","Uruguayan","Ute","Venezuelan","Vietnamese","White","Yakama","Yaqui","Yuman"];

// {"id":1,"first_name":"Marilyn","last_name":"Mitchell","email":"mmitchell0@yolasite.com","gender":"Female","ip_address":"101.240.87.37","country":"Brazil","age":67,"race":"South American"}

var queryByGender = {
  query: (words, q) => {
      result = {};
      if (findOne(words, woman)) {
          result = { gender: "Female" };
      } else if (findOne(words, man)) {
          result = { gender: "Male" };
      }
      return result;
  }
};

const queryTypes = [queryByGender];

var buildQueryBuilder = (words, q) => {
    var qs = queryTypes.map(builder => builder.query(words, q));
    return queryBuilder.where(queryBuilder.byExample(...qs));
};

var mldb = {
    search: (words, q) => db.documents.query(buildQueryBuilder(words, q)).result()
};

// mldb.search(["okay", "michael", "search", "women"], "").then(d => d.forEach(obj => console.log(JSON.stringify(obj.content))));

module.exports = mldb;