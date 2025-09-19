#!/usr/bin/env python3
"""
Wave Blog API - Post Publishing Example
Usage: python publish-post.py
"""

import requests
import json
from datetime import datetime
import re

class WaveBlogAPI:
    def __init__(self, base_url="http://localhost:3000/api"):
        self.base_url = base_url
        self.token = None
        
    def login(self, email, password):
        """Step 1: Login and get JWT token"""
        try:
            response = requests.post(f"{self.base_url}/users/login", json={
                "email": email,
                "password": password
            })
            response.raise_for_status()
            
            self.token = response.json()["token"]
            print("✅ Successfully logged in")
            return self.token
        except requests.exceptions.RequestException as e:
            print(f"❌ Login failed: {e}")
            raise
    
    def upload_image(self, image_path, alt_text):
        """Step 2: Upload hero image"""
        try:
            headers = {"Authorization": f"Bearer {self.token}"}
            files = {"file": open(image_path, "rb")}
            data = {"alt": alt_text}
            
            response = requests.post(f"{self.base_url}/media", 
                                   headers=headers, files=files, data=data)
            response.raise_for_status()
            
            image_id = response.json()["doc"]["id"]
            print("✅ Image uploaded successfully")
            return image_id
        except requests.exceptions.RequestException as e:
            print(f"❌ Image upload failed: {e}")
            raise
        finally:
            files["file"].close()
    
    def create_category(self, title, slug):
        """Step 3: Create category if needed"""
        try:
            headers = {
                "Authorization": f"Bearer {self.token}",
                "Content-Type": "application/json"
            }
            data = {"title": title, "slug": slug}
            
            response = requests.post(f"{self.base_url}/categories", 
                                   headers=headers, json=data)
            response.raise_for_status()
            
            category_id = response.json()["doc"]["id"]
            print(f"✅ Category '{title}' created")
            return category_id
        except requests.exceptions.RequestException:
            print(f"ℹ️  Category '{title}' might already exist")
            return None
    
    def publish_post(self, post_data):
        """Step 4: Create and publish post"""
        try:
            headers = {
                "Authorization": f"Bearer {self.token}",
                "Content-Type": "application/json"
            }
            
            response = requests.post(f"{self.base_url}/posts", 
                                   headers=headers, json=post_data)
            response.raise_for_status()
            
            post = response.json()["doc"]
            print("✅ Post published successfully")
            print(f"📝 Post URL: /posts/{post['slug']}")
            return post
        except requests.exceptions.RequestException as e:
            print(f"❌ Post creation failed: {e}")
            raise
    
    def create_wave_post(self, title, content_paragraphs, hero_image_id=None, category_ids=None):
        """Helper: Create Wave-branded post data"""
        if category_ids is None:
            category_ids = []
            
        # Convert paragraphs to Lexical format
        content_children = []
        for paragraph in content_paragraphs:
            if paragraph.startswith('# '):
                # Heading
                content_children.append({
                    "type": "heading",
                    "tag": "h2",
                    "children": [{"type": "text", "text": paragraph[2:]}]
                })
            else:
                # Paragraph
                content_children.append({
                    "type": "paragraph",
                    "children": [{"type": "text", "text": paragraph}]
                })
        
        # Generate slug from title
        slug = re.sub(r'[^a-z0-9 -]', '', title.lower())
        slug = re.sub(r'\s+', '-', slug)
        slug = re.sub(r'-+', '-', slug)
        
        post_data = {
            "title": title,
            "content": {
                "root": {
                    "type": "root",
                    "children": content_children
                }
            },
            "categories": category_ids,
            "meta": {
                "title": f"{title} - Wave AI Damage Assessment",
                "description": f"{content_paragraphs[0][:160]}... - Discover how Wave's AI technology is transforming insurance claims processing."
            },
            "_status": "published",
            "slug": slug,
            "publishedAt": datetime.now().isoformat()
        }
        
        if hero_image_id:
            post_data["heroImage"] = hero_image_id
            
        return post_data

def main():
    """Example usage"""
    api = WaveBlogAPI()
    
    try:
        # 1. Login
        api.login("your-admin@buildwithwave.com", "your-password")
        
        # 2. Upload hero image (optional)
        # hero_image_id = api.upload_image("./hero-image.jpg", "Wave AI Dashboard")
        
        # 3. Create categories
        case_study_id = api.create_category("Case Studies", "case-studies")
        ai_tech_id = api.create_category("AI Technology", "ai-technology")
        
        # 4. Create post content
        content = [
            "Wave's AI-powered damage assessment platform is revolutionizing insurance claims processing, delivering accurate estimates in minutes instead of weeks.",
            "# Key Benefits for Insurance Companies",
            "• Reduce claim processing time by 95%\n• Improve accuracy with AI validation\n• Accelerate cash flow for customers\n• Lower operational costs significantly",
            "# Real-World Results",
            "Leading insurance companies report dramatic improvements in efficiency, customer satisfaction, and bottom-line results after implementing Wave's technology.",
            "# Getting Started with Wave",
            "Ready to transform your claims processing? Contact our team to learn how Wave can help your insurance company reduce cycle times and improve customer satisfaction."
        ]
        
        # 5. Create and publish post
        post_data = api.create_wave_post(
            "How Wave AI Transforms Insurance Claims Processing",
            content,
            # hero_image_id,  # uncomment if you uploaded an image
            None,
            [case_study_id, ai_tech_id] if case_study_id and ai_tech_id else []
        )
        
        published_post = api.publish_post(post_data)
        
        print("🎉 Post published successfully!")
        print(f"🔗 View at: http://localhost:3000/posts/{published_post['slug']}")
        
    except Exception as e:
        print(f"❌ Publishing failed: {e}")

if __name__ == "__main__":
    main()









