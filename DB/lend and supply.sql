CREATE DEFINER=`root`@`localhost` PROCEDURE `lend_and_supply`()
BEGIN
select i.item_no,i.product_name,o.owner_name,c.ctgy_name,i.inv_qty,i.min_stock from inventory i join owner o on i.owner_id = o.owner_id
join categories c on i.ctgy_id = c.ctgy_id; 
END
