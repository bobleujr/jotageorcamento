package br.com.budget.services;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.json.JSONObject;

import br.com.budget.dao.ItemDAO;
import br.com.budget.entities.Item;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;

@Path("/item")
public class ItemService {
	 @POST
	 @Path("/add") 
	 @Consumes(MediaType.APPLICATION_JSON)
	 @Produces(MediaType.APPLICATION_JSON)
	 public String addItem(String param1){
		 
		 JSONObject obj = new JSONObject(param1);
		 
		 Item item = new Item();
		 item.setName(obj.getString("name"));
		 item.setDescription(obj.getString("description"));
		 item.setDescription2(obj.getString("description1"));
		 item.setDescription3(obj.getString("description2"));
		 item.setPrice(obj.getDouble("price"));
		 item.setPrice2(obj.getDouble("price1"));
		 item.setPrice3(obj.getDouble("price2"));
		 
		 
		 ItemDAO dao = new ItemDAO();
		 Key key = dao.addItem(item);
		 
		 return new JSONObject(key).toString();
	 }
	 
	 @POST
	 @Path("/list") 
	 @Produces(MediaType.APPLICATION_JSON)
	 public String listItem(){
		 
		 ItemDAO dao = new ItemDAO();
		 List<Entity> items = dao.listItem();
		 
		 return new JSONObject(items).toString();
	 }
	
}
