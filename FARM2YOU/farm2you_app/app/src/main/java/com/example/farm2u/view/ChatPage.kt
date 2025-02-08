package com.example.farm2u.view

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.Send
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.example.farm2u.R
import com.example.farm2u.model.MessageModel
import com.example.farm2u.ui.theme.ColorModelMessage
import com.example.farm2u.ui.theme.ColorUserMessage
import com.example.farm2u.ui.theme.Purple80
import com.example.farm2u.viewModel.ChatViewModel

@RequiresApi(Build.VERSION_CODES.VANILLA_ICE_CREAM)
@Composable
fun ChatPage(navController: NavHostController, modifier: Modifier = Modifier, viewModel: ChatViewModel) {
    Column(
        modifier = modifier.windowInsetsPadding(insets = WindowInsets.systemBars)
    ) {
        AppHeader(
            navController = navController
        )
        MessageList(
            modifier = Modifier.weight(1f),
            messageList = viewModel.messageList
        )
        MessageInput(
            onMessageSend = {
                viewModel.sendMessage(it)
            }
        )
    }
}


@Composable
fun MessageList(modifier: Modifier = Modifier, messageList : List<MessageModel>) {
    if(messageList.isEmpty()){
        Column(
            modifier = modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Icon(
                modifier = Modifier.padding(10.dp),
                painter = painterResource(id = R.drawable.chatbot),
                contentDescription = "Icon",
                tint = Purple80,
            )
            Text(text = "Hariya-Mali \n Always here to help you!",
                textAlign = TextAlign.Center,
                fontSize = 22.sp,
            )
        }
    } else {
        LazyColumn(
            modifier = modifier,
            reverseLayout = true
        ) {
            items(messageList.reversed()){
                MessageRow(messageModel = it)
            }
        }
    }
}

@Composable
fun MessageRow(messageModel: MessageModel) {
    val isModel = messageModel.role=="model"

    Row(
        verticalAlignment = Alignment.CenterVertically
    ) {

        Box(
            modifier = Modifier.fillMaxWidth()
        ) {

            Box(
                modifier = Modifier
                    .align(if (isModel) Alignment.BottomStart else Alignment.BottomEnd)
                    .padding(
                        start = if (isModel) 8.dp else 70.dp,
                        end = if (isModel) 70.dp else 8.dp,
                        top = 8.dp,
                        bottom = 8.dp
                    )
                    .clip(RoundedCornerShape(48f))
                    .background(if (isModel) ColorModelMessage else ColorUserMessage)
                    .padding(16.dp)
            ) {

                SelectionContainer {
                    Text(
                        text = messageModel.message,
                        fontWeight = FontWeight.W500,
                        color = Color.White
                    )
                }
            }
        }
    }
}

@Composable
fun MessageInput(onMessageSend : (String)-> Unit) {

    var message by remember {
        mutableStateOf("")
    }

    Row(
        modifier = Modifier.padding(8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        OutlinedTextField(
            modifier = Modifier.weight(1f),
            value = message,
            onValueChange = {
                message = it
            }
        )
        IconButton(onClick = {
            if(message.isNotEmpty()){
                onMessageSend(message)
                message = ""
            }

        }) {
            Icon(
                imageVector = Icons.AutoMirrored.Filled.Send,
                contentDescription = "Send"
            )
        }
    }
}

@Composable
fun AppHeader(navController: NavHostController) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.primary),
    ) {
        IconButton(
            onClick = {
                navController.popBackStack()
            },
            modifier = Modifier.align(Alignment.CenterVertically)
        ){
            Icon(
                imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                contentDescription = "Arrow back",
                tint = Color.White
            )
        }
        Text(
            modifier = Modifier.padding(16.dp),
            text = "Hariya-Mali",
            color = Color.White,
            fontSize = 22.sp
        )
    }
}
