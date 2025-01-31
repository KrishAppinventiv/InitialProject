import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { vh } from '../../utils/dimension';
const API_URL = 'https://dummyjson.com/products';
const POSTS_PER_PAGE = 10;
type Post = {
    id: number;
    thumbnail: string;
    description: string;
    liked?: boolean;
  };
  

const PostFeed = () => {
    const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true); 
 

  const fetchPosts = async (pageNumber: number) => {
    try {
        const response = await fetch(`${API_URL}?limit=${POSTS_PER_PAGE}&skip=${(pageNumber - 1) * POSTS_PER_PAGE}`);
        const data = await response.json();
        console.log('Fetched data:', data.products);
        return data.products;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  };

 
  const loadPosts = async (pageNumber: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newPosts = await fetchPosts(pageNumber);

    if (newPosts.length > 0) {
      setPosts((prevPosts) => (pageNumber === 1 ? newPosts : [...prevPosts, ...newPosts]));
      
      setPage(pageNumber + 1);
    } else {
      setHasMore(false); 
    }
    setLoading(false);
  };

  
  const handleRefresh = async () => {
    setRefreshing(true);
    setHasMore(true); 
    await loadPosts(1);
    setRefreshing(false);
  };

  const toggleLike = (postId:number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, liked: !post.liked } : post
      )
    );
  };
  
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadPosts(page);
    }
  };

  
  
 
  useEffect(() => {
    loadPosts(1);
  }, []);


  const MemoizedPost = React.memo(({ item }: { item: Post }) => {
    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image source={{ uri: `https://i.pravatar.cc/50?u=${item.id}` }} style={styles.profilePic} />
          <Text style={styles.username}>User_{item.id}</Text>
        </View>

        <Image source={{ uri: item.thumbnail }} style={styles.postImage} />

        <Text style={styles.caption}>{item.description}</Text>

        <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(item.id)}>
          <Icon name={item.liked ? 'heart' : 'hearto'} size={24} color={item.liked ? 'red' : 'black'} />
          <Text style={[styles.likeText, { fontWeight: item.liked ? '600' : '400' }]}>Like</Text>
        </TouchableOpacity>
      </View>
    );
  }, (prevProps, nextProps) => prevProps.item.liked === nextProps.item.liked); 
 
  const renderPost = ({ item }: { item: Post }) => <MemoizedPost item={item} />;
  
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item) => item.id.toString()} 
      onEndReached={handleLoadMore} 
      onEndReachedThreshold={0.5} 
      ListFooterComponent={renderFooter} 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} /> 
      }
    />
  );
};


const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 300,
    
  },
  caption: {
    padding: 10,
    fontSize: 14,
    color: '#333',
  },
  likeButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#f0f0f0',
    flexDirection:'row'
  },
  likeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 10,
    alignItems: 'center',
  },
  likeText:{
    marginLeft:vh(10),
    fontSize:vh(16)
  }
});

export default React.memo(PostFeed); 