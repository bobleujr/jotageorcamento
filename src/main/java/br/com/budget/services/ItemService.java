package br.com.budget.services;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.json.JSONObject;

import br.com.budget.dao.ItemDAO;
import br.com.budget.entities.Item;

@SuppressWarnings("unused")
@Path("/item")
public class ItemService {

	 @POST
	 @Path("/add") 
	 @Consumes(MediaType.APPLICATION_JSON)
	 @Produces(MediaType.APPLICATION_JSON)
	 public String firstApiCall(String param1){
		 
		 JSONObject obj = new JSONObject(param1);
		 
		 Item item = new Item();
		 item.setName(obj.getString("name"));
		 item.setDescription("Descricao1");
		 item.setDescription2("Descricao1");
		 item.setDescription3("Descricao1");
		 item.setValue(100);
		 item.setValue2(100);
		 item.setValue3(100);
		 
		 JSONObject obj = new JSONObject(item);
		 
		 ItemDAO dao = new ItemDAO();
		 dao.addItem(item);
		
		 return obj.toString();
	 }
	
}
