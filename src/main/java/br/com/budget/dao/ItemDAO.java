package br.com.budget.dao;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;

import br.com.budget.entities.Item;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
public class ItemDAO {
	
	
	public Key addItem(Item item){
		DateTime now = new DateTime();
		LocalDate today = now.toLocalDate();
		
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();


		Entity object = new Entity("object");

		object.setProperty("name", item.getName());
		object.setProperty("description", item.getDescription());
		object.setProperty("description2", item.getDescription2());
		object.setProperty("description3", item.getDescription3());
		object.setProperty("value", item.getValue());
		object.setProperty("value2", item.getValue2());
		object.setProperty("value3", item.getValue3());
		object.setProperty("lastUpdate", today.toDate());

		Key key = datastore.put(object);
		
		return key;
	}
}
