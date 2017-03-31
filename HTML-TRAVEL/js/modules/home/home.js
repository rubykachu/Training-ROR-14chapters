$(document).ready(function(){
  var $box_modal = $("#box-modal"),
      $box_modal_content = $('#box-modal main');
      $table = $('#orders');

  var items = [], stt = total = 0;

  // Close box modal
  $('#box-modal .close').click(function(){
    $box_modal.fadeOut(120);
    return false;
  });

  // Checkout
  $("#checkout-cart").click(function(){
    $box_modal.fadeIn(120);
    return false;
  });

  // Buy item
  $(document).on('click', '.buy-item i', function(e){
    var $this = $(this),
        $box_item = $this.closest('.box-item');
    var name = $box_item.find('.title').text(),
        price = $box_item.find('.price label').text(),
        id = $box_item.prop("id");

    items = []
    items.push({"name": name, "price": price, "id": id});

    // Update total items shopping cart
    stt = total += 1;
    update_total_shopping_cart(total);

    // Update items in table order
    update_table_orders();

    // Checked
    $box_item.addClass('checked');
    $this.removeClass('fa-shopping-basket').addClass('fa-check');

    // Update table orders
    update_amount_n_number();

    return false;
  });

  // Change number item
  $(document).on('change', '.quantity', function(){
    update_amount_n_number();
  });

  // Delete item
  $(document).on('click', '.btn-delete', function(){
    var $this = $(this),
        $box_item = $('#'+ $this.data("id") );
        
    // Delete row table
    $this.parents('tr')
      .css("background-color", "#f96d69")
      .delay(300)
      .fadeOut(400, function(){
        update_amount_n_number();
        $(this).remove();
        update_amount_n_number();
        update_total_shopping_cart(total -= 1);
      });

    // Unchecked item
    removeClassCheckedBoxItem($box_item);
  });

  // Cancel order
  $('.cancel-order').click(function(){
    if( total > 0 ){
      $('.btn-delete').click();
    }else{
      $box_modal_content.find('.alert').remove();
      $box_modal_content.prepend('<p class="alert alert-danger"><strong>Thất bại!</strong> Bạn chưa đặt tour</p>');
    }
  });

  // Submit order
  $(document).on('click', '.btn-order', function(){
    $box_modal_content.find('.alert').remove();

    if( total > 0 ){
      total = 0;
      $box_modal.find('.quantity').prop('disabled', true);
      $('#box-modal .btn-delete').remove();
      $('.cancel-order').hide();

      // Alert message order success
      $box_modal_content.prepend('<p class="alert alert-success"><strong>Thành công!</strong> Đặt tour thành công</p>');

      // Remove class checked box item
      $table.find('tbody tr').each(function(){
        var $this = $(this),
            $box_item = $('#' + $this.data("id"));
        removeClassCheckedBoxItem($box_item);
      });

      // Update total shoping cart
      update_total_shopping_cart(total);

      // Change it
      $(this).removeClass('btn-order btn-primary').addClass('btn-danger btn-close').text('Thoát');
      
    }else{
      $box_modal_content.prepend('<p class="alert alert-danger"><strong>Thất bại!</strong> Bạn chưa đặt tour</p>');
    }
  });

  // Logout order
  $(document).on('click', "#box-modal .btn-close", function(){
    $box_modal.find('tbody').empty();
    $box_modal.find('.alert').remove();
    $box_modal.find('.total-amount').text("0");
    $box_modal.find('.total-quantity').text("0");
    $('.cancel-order').show();
    $(this).removeClass('btn-close btn-danger').addClass('btn-primary btn-order').text("Đặt tour");
    $box_modal.fadeOut(120);
  });


  /************************************************
  **************** TABLE ORDER *******************
  ************************************************/
  function update_total_shopping_cart(number){
    $('#shopping-cart').find('label').text(number);
  }

  function update_table_orders(){
    var $total = $('#orders tfoot .total');
    var html = '';
    $.each(items, function(key, item){
      html += '<tr data-id="'+ item.id +'">';
      html += '<td>'+ stt +'</td>';
      html += '<td>'+ item.name +'</td>';
      html += '<td class="unit-price">'+ item.price +'</td>';
      html += '<td> <input type="number" class="quantity" value="1" min="1" max="5"> </td>';
      html += '<td class="amount">0</td>'
      html += '<td><button class="btn btn-danger btn-delete" data-id="'+ item.id +'"><i class="fa fa-trash-o"></i></button></td>';
      html += '</tr>';
    });
    $table.children('tbody').append(html);
  }

  function update_total_item(){
    var total_item = 0;
    $table.find('tbody .quantity').each(function(){
      count = parseInt($(this).val());
      total_item += count;
    });
    $table.find('tfoot .total-quantity').text(total_item);
  }

  function calculate_amount(){
    var total_amount = 0;
    $table.find('tbody tr').each(function(){
      var $this = $(this),
          $amount = $this.children('.amount'),
          unit_price = $this.children('.unit-price').text(),
          quantity = $this.find('.quantity').val();
      unit_price = unit_price.replace(/\./g, '');
      unit_price = parseInt(unit_price);
      total_price = unit_price * quantity;
      total_amount += total_price;

      // Show amount
      $amount.text( format_currency(total_price) );
    });

    // Show total amount
    $table.find('tfoot .total-amount').text( format_currency(total_amount) );
  }

  // Update Amount and Number items
  function update_amount_n_number(){
    update_total_item();
    calculate_amount();
  }

  // Format currency 
  function format_currency(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2');
    }
    return val;
  }

  function removeClassCheckedBoxItem($box_item){
    $box_item.removeClass("checked")
         .find('.buy-item i')
         .removeClass('fa-checked')
         .addClass('fa-shopping-basket');
  }
});