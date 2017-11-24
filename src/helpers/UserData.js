'use strict';

function UserData(data) {
  this.rawData = data;
};

UserData.prototype.id = function () {
  return this.rawData.id;
};

UserData.prototype.firstname = function () {
  return this.rawData.firstname;
};

UserData.prototype.surname = function () {
  return this.rawData.surname;
};

UserData.prototype.language = function () {
  return this.rawData.language;
};

UserData.prototype.country = function () {
  return this.rawData.country;
};

UserData.prototype.email = function () {
  return this.rawData.email;
};

UserData.prototype.image = function () {
  return this.rawData.image;
};

UserData.prototype.get = function (key) {
  return this.rawData[key];
};

module.exports = UserData;
