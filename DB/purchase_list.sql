CREATE DEFINER=`root`@`localhost` PROCEDURE `purchase_list`()
BEGIN
select item_no,product_name,inv_qty,min_stock,min_stock-inv_qty as reorder_quantity,unit_price,inv_qty*unit_price as total_price from inventory
where inv_qty < min_stock;
END