// Generated by view binder compiler. Do not edit!
package com.example.uday.databinding;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.viewbinding.ViewBinding;
import androidx.viewbinding.ViewBindings;
import com.example.uday.R;
import java.lang.NullPointerException;
import java.lang.Override;
import java.lang.String;

public final class SosLayoutChatBinding implements ViewBinding {
  @NonNull
  private final LinearLayout rootView;

  @NonNull
  public final TextView messageBox;

  @NonNull
  public final ImageView playButton;

  private SosLayoutChatBinding(@NonNull LinearLayout rootView, @NonNull TextView messageBox,
      @NonNull ImageView playButton) {
    this.rootView = rootView;
    this.messageBox = messageBox;
    this.playButton = playButton;
  }

  @Override
  @NonNull
  public LinearLayout getRoot() {
    return rootView;
  }

  @NonNull
  public static SosLayoutChatBinding inflate(@NonNull LayoutInflater inflater) {
    return inflate(inflater, null, false);
  }

  @NonNull
  public static SosLayoutChatBinding inflate(@NonNull LayoutInflater inflater,
      @Nullable ViewGroup parent, boolean attachToParent) {
    View root = inflater.inflate(R.layout.sos_layout_chat, parent, false);
    if (attachToParent) {
      parent.addView(root);
    }
    return bind(root);
  }

  @NonNull
  public static SosLayoutChatBinding bind(@NonNull View rootView) {
    // The body of this method is generated in a way you would not otherwise write.
    // This is done to optimize the compiled bytecode for size and performance.
    int id;
    missingId: {
      id = R.id.message_box;
      TextView messageBox = ViewBindings.findChildViewById(rootView, id);
      if (messageBox == null) {
        break missingId;
      }

      id = R.id.play_button;
      ImageView playButton = ViewBindings.findChildViewById(rootView, id);
      if (playButton == null) {
        break missingId;
      }

      return new SosLayoutChatBinding((LinearLayout) rootView, messageBox, playButton);
    }
    String missingId = rootView.getResources().getResourceName(id);
    throw new NullPointerException("Missing required view with ID: ".concat(missingId));
  }
}
