<?php

// Add the class from the regsistration form to a user's classes ACF field.
// Annoyingly, this field is only accessible via an ID from this hook.
// On prod this field's ID is 3
add_action( 'gform_user_registered', 'vnv_add_class_on_registration', 10, 4 );
function vnv_add_class_on_registration( $user_id, $feed, $entry, $user_pass ) {
  $class = $entry[3]; // gravity forms field ID
  $acf_user_id = "user_$user_id";
  if ($class) {
    // update_sub_field(['classes', 1, 'class'], $class, $acf_user_id);
    update_field('classes', [['class' => $class]], $acf_user_id);
  }
}

// pre_get_users? pre_user_query?
add_filter( 'pre_get_users', 'vnv_filter_users_by_classes', 10, 1);
function vnv_filter_users_by_classes( $user_query ) {

  // Return early if no class search string OR we have a meta_query already
  if (empty($_REQUEST['class-s']) || !empty($user_query->meta_query->queries)) {
    return $user_query;
  }

  $class_args = [];
  for ($i=0; $i < 9; $i++) { 
    $class_args[] = [
      'key'     => "classes_${i}_class",
      'value'   => $_REQUEST['class-s'],
      'compare' => '='
    ];
  }

  $meta_query = array_merge(['relation' => 'OR'], $class_args);
  $user_query->set('meta_query', $meta_query);
}