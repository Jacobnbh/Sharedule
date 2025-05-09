package com.sharedule.app.model.user;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
public class AppUsers implements Users {
    @Id
    @Field("_id")
    private String id;

    @Indexed(unique = true)
    private String username;

    @Indexed(unique = true)
    private String email;

    private String password;

    private String displayPicture;

    private String role;


    @Override
    public String toString() {
        return "AppUsers{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", displayPicture='" + displayPicture + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

    @Override
    public void setId(Long id){
        this.id= String.valueOf(id);
    }

    @Override
public boolean equals(Object obj) {
    // Check if the objects are the same instance
    if (this == obj) return true;

    // Check if the object is null or if the classes are different
    if (obj == null || getClass() != obj.getClass()) return false;

    // Cast the object to AppUsers to access the fields
    AppUsers that = (AppUsers) obj;

    // Compare all relevant fields
    return id.equals(that.id) &&
           username.equals(that.username) &&
           email.equals(that.email) &&
           password.equals(that.password) &&
           displayPicture.equals(that.displayPicture) &&
           role.equals(that.role);
}




    public AppUsers(String username, String email, String password, String role, String displayPicture) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.displayPicture = displayPicture;
    }
}
