CREATE PROCEDURE `MISSION_TOTAL_PRICE`()
BEGIN
update inventory set total_price =unit_price*inv_qty where item_no >=1000;
select item_no, product_name, description, ctgy_name,type_name,inv_qty,min_stock,unit_price,owner_name,lc_name,zone,cabinet,bin_no,total_price
from inventory,categories,location,types,owner where categories.ctgy_id = inventory.ctgy_id 
and types.type_id = inventory.type_id 
and location.lc_id = inventory.lc_id 
and owner.owner_id = inventory.owner_id ; 
END
