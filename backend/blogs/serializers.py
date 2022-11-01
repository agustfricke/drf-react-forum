from rest_framework import serializers
from .models import Blog, Comment

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.user_name', read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"


class BlogSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.user_name', read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Blog
        fields = '__all__'

    def get_comments(self, obj):
        comments = obj.comment_set.all()
        serializer = CommentSerializer(comments, many=True)
        return serializer.data

