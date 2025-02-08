import com.example.uday.database.AudioRequest
import com.example.uday.database.DataRequest
import com.example.uday.database.DataRequestsos
import com.example.uday.database.ImageRequest
import com.example.uday.database.ResponseMessage
import com.example.uday.database.UserListdata
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Multipart
import retrofit2.http.Path


object RetrofitClient {
    private const val BASE_URL = "http://192.168.137.119:3000/"

    val instance: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    val apiService: ApiService by lazy {
        instance.create(ApiService::class.java)
    }
}
interface ApiService {
    @POST("sendData")
    fun sendData(@Body request: DataRequest): Call<Map<String, Any>>

    @POST("sendSOS")
    fun sendSOS(@Body request: DataRequestsos): Call<ResponseMessage>

    @GET("getUserByPhone")
    fun getUserByPhone(@Query("phone") phoneNumber: String): Call<UserListdata>

    @POST("uploadAudio")
    fun uploadAudio(@Body request: AudioRequest): Call<ResponseMessage>

    @GET("getAllUsers")
    fun getAllUsers(): Call<List<UserListdata>>

    @Multipart
    @POST("/uploadImage")
    fun uploadImage(@Body imageRequest: ImageRequest): Call<ResponseMessage>
}
